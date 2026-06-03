import mongoose from "mongoose";
import { z } from "zod";
import Destination from "../models/destination.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { addNumberRangeFilter, buildPaginationMeta, buildSelect, buildSort, parsePagination, regexFilter, regexInFilter } from "../utils/queryFeatures.js";

const destinationSortFields = [
    "name",
    "city",
    "country",
    "estimatedBudget",
    "createdAt",
    "category",
];

const destinationSelectFields = [
    "_id",
    "name",
    "city",
    "state",
    "country",
    "description",
    "estimatedBudget",
    "images",
    "bestTimeToVisit",
    "category",
    "tags",
    "createdAt",
    "updatedAt",
];

// Converts req.query into a safe MongoDB filter object for Destination APIs.
// Important principle:
// frontend query params should not be passed directly into Destination.find().
// This builder acts as a translator and allow-list layer.
const buildDestinationFilters = (query) => {
    const filter = {};

    // Global search across multiple fields.
    // MongoDB treats $or as "match if any one of these conditions is true".
    if (query.search) {
        filter.$or = [
            { name: regexFilter(query.search) },
            { description: regexFilter(query.search) },
            { city: regexFilter(query.search) },
            { state: regexFilter(query.search) },
            { country: regexFilter(query.search) },
            { category: regexFilter(query.search) },
            { tags: regexFilter(query.search) },
        ];
    }

    // Single city: ?city=goa
    // Multiple cities: ?city=goa,mysore
    // Multiple values use $in so any listed city can match.
    if (query.city) {
        filter.city = String(query.city).includes(",")
            ? regexInFilter(query.city)
            : regexFilter(query.city);
    }

    if (query.state) {
        filter.state = String(query.state).includes(",")
            ? regexInFilter(query.state)
            : regexFilter(query.state);
    }

    // Same pattern as city: exact API shape, safe MongoDB filter output.
    if (query.country) {
        filter.country = String(query.country).includes(",")
            ? regexInFilter(query.country)
            : regexFilter(query.country);
    }

    if (query.category) {
        filter.category = String(query.category).includes(",")
            ? regexInFilter(query.category)
            : regexFilter(query.category);
    }

    // Tags are stored as an array in the schema.
    // MongoDB can match array fields using $in.
    if (query.tags) {
        filter.tags = regexInFilter(query.tags);
    }

    // Adds estimatedBudget range filtering when minBudget/maxBudget exist.
    // The helper also validates invalid numbers and impossible ranges.
    addNumberRangeFilter(filter, query, {
        field: "estimatedBudget",
        minKey: "minBudget",
        maxKey: "maxBudget",
        label: "budget",
    });

    return filter;
};

export const createDestination = asyncHandler(async (req, res) => {
    const parsed = createDestinationSchema.safeParse(req.body);
    
    if (!parsed.success) {
        throw new ApiError(400, parsed.error.errors.map(err => err.message).join(", "));
    }

    const { name, city, state, country, description, estimatedBudget, images, bestTimeToVisit, category, tags } = parsed.data;

    try {
        const destination = await Destination.create({
            name,
            city,
            state,
            country,
            description,
            estimatedBudget,
            images,
            bestTimeToVisit,
            category,
            tags,
        });

        if (!destination) {
            throw new ApiError(404, "Error during creation of Destination");
        }

        return res.status(201).json(
            new ApiResponse(
                201,
                destination,
                "Destination created successfully"
            )
        );
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(409, "Destination already exists");
        }

        throw error;
    }
});

export const getAllDestinations = asyncHandler(async (req, res) => {
    // Build the Mongo filter ONCE and reuse it for both countDocuments and find.
    // This keeps pagination totals consistent with the actual returned data.
    let filter = buildDestinationFilters(req.query);

    // Validates page/limit and calculates skip.
    const { page, limit, skip } = parsePagination(req.query);

    // Validates sortBy/sortType and converts them to a Mongoose sort object.
    const sortOptions = buildSort(req.query, {
        allowedFields: destinationSortFields,
        defaultSortBy: "createdAt",
        defaultSortType: "desc",
    });

    // Converts ?fields=name,city into "name city" for Mongoose .select().
    const selectedFields = buildSelect(req.query, destinationSelectFields);

    // Counts ALL matching documents, not only the current page.
    let totalDocuments = await Destination.countDocuments(filter);

    // Mongoose query methods are chainable and execute only when awaited.
    let destinations = await Destination.find(filter)
        .select(selectedFields)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

    // READ-THROUGH CACHE LOGIC
    // If no destinations found, AND the user explicitly searched for something (city or general search)
    if (destinations.length === 0 && (req.query.search || req.query.city)) {
        const searchQuery = req.query.city || req.query.search;
        console.log(`Cache miss for "${searchQuery}". Fetching from external API...`);

        try {
            const { fetchAndFormatDestination } = await import("../services/externalApi.service.js");
            const newDestinationData = await fetchAndFormatDestination(searchQuery);

            if (newDestinationData) {
                console.log(`Found city data for "${searchQuery}". Saving to DB...`);

                try {
                    await Destination.create(newDestinationData);
                } catch (insertError) {
                    if (insertError.code !== 11000) { // Ignore duplicate key errors silently
                        console.error("DB Insert Error during cache fill:", insertError);
                    }
                }

                // Re-run the local database query now that the cache is populated
                totalDocuments = await Destination.countDocuments(filter);
                destinations = await Destination.find(filter)
                    .select(selectedFields)
                    .sort(sortOptions)
                    .skip(skip)
                    .limit(limit);
            }
        } catch (apiError) {
            console.error("External API Read-Through Cache Error:", apiError);
            // Fail gracefully
        }
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                destinations,
                pagination: buildPaginationMeta({
                    page,
                    limit,
                    totalDocuments,
                }),
            },
            "Destinations fetched successfully"
        )
    );
});

export const getDestinationById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid destination id");
    }

    const destination = await Destination.findById(id);

    if (!destination) {
        throw new ApiError(404, "Destination not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            destination,
            "Destination fetched successfully"
        )
    );
});

export const updateDestinationById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid destination id");
    }

    if (Object.keys(req.body).length === 0) {
        throw new ApiError(400, "At least one field is required to update");
    }

    const parsed = updateDestinationSchema.safeParse(req.body);
    
    if (!parsed.success) {
        throw new ApiError(400, parsed.error.errors.map(err => err.message).join(", "));
    }

    const { name, city, state, country, description, estimatedBudget, images, bestTimeToVisit, category, tags } = parsed.data;

    const destination = await Destination.findById(id);

    if (!destination) {
        throw new ApiError(404, "Destination not found");
    }

    if (name !== undefined) destination.name = name;
    if (city !== undefined) destination.city = city;
    if (state !== undefined) destination.state = state;
    if (country !== undefined) destination.country = country;
    if (description !== undefined) destination.description = description;
    if (estimatedBudget !== undefined) destination.estimatedBudget = estimatedBudget;
    if (images !== undefined) destination.images = images;
    if (bestTimeToVisit !== undefined) destination.bestTimeToVisit = bestTimeToVisit;
    if (category !== undefined) destination.category = category;
    if (tags !== undefined) destination.tags = tags;

    try {
        const updatedDestination = await destination.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedDestination,
                "Destination updated successfully"
            )
        );
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(409, "Destination already exists");
        }

        throw error;
    }
});

export const deleteDestinationById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid destination id");
    }

    const destination = await Destination.findByIdAndDelete(id);

    if (!destination) {
        throw new ApiError(404, "Destination not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Destination deleted successfully"
        )
    );
});

// @desc    Get weather for destination
// @route   GET /api/v1/destinations/:id/weather
// @access  Public
export const getDestinationWeather = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid destination ID");
    }

    const destination = await Destination.findById(id);

    if (!destination) {
        throw new ApiError(404, "Destination not found");
    }

    const { getWeatherForCity } = await import("../services/externalApi.service.js");

    const weatherData = await getWeatherForCity(destination.city);

    return res.status(200).json(
        new ApiResponse(200, weatherData, "Weather data fetched successfully")
    );
});
