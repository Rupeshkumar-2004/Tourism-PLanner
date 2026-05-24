import mongoose from "mongoose";
import Destination from "../models/destination.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    addNumberRangeFilter,
    buildPaginationMeta,
    buildSelect,
    buildSort,
    parsePagination,
    regexFilter,
    regexInFilter,
} from "../utils/queryFeatures.js";

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
    const { name, city, state, country, description, estimatedBudget, images, bestTimeToVisit, category, tags } = req.body;

    if([name, city, state].some(field => typeof field !== "string" || field.trim() === "")){
        throw new ApiError(400, "Name, city and state are required");
    }

    let budgetNumber = estimatedBudget;

    if(estimatedBudget !== undefined){
        budgetNumber = Number(estimatedBudget);

        if(Number.isNaN(budgetNumber) || budgetNumber < 0){
            throw new ApiError(400, "Estimated budget cannot be negative");
        }
    }

    if(images !== undefined && !Array.isArray(images)){
        throw new ApiError(400, "Images must be an array");
    }

    if(tags !== undefined && !Array.isArray(tags)){
        throw new ApiError(400, "Tags must be an array");
    }

    if(category !== undefined && typeof category !== "string"){
        throw new ApiError(400, "Category must be a string");
    }

    try {
        const destination = await Destination.create({
            name,
            city,
            state,
            country,
            description,
            estimatedBudget: budgetNumber,
            images,
            bestTimeToVisit,
            category,
            tags,
        });

        if(!destination){
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
    const filter = buildDestinationFilters(req.query);

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
    // This is why the frontend can know totalPages and hasNextPage.
    const totalDocuments = await Destination.countDocuments(filter);

    // Mongoose query methods are chainable and execute only when awaited.
    // Order here means: filter -> select fields -> sort -> skip -> limit.
    const destinations = await Destination.find(filter)
        .select(selectedFields)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

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
    const { name, city, state, country, description, estimatedBudget, images, bestTimeToVisit, category, tags } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid destination id");
    }

    if (Object.keys(req.body).length === 0) {
        throw new ApiError(400, "At least one field is required to update");
    }

    if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
        throw new ApiError(400, "Destination name cannot be empty");
    }

    if (city !== undefined && (typeof city !== "string" || city.trim() === "")) {
        throw new ApiError(400, "City cannot be empty");
    }

    if (state !== undefined && (typeof state !== "string" || state.trim() === "")) {
        throw new ApiError(400, "State cannot be empty");
    }

    if (country !== undefined && (typeof country !== "string" || country.trim() === "")) {
        throw new ApiError(400, "Country cannot be empty");
    }

    if (category !== undefined && typeof category !== "string") {
        throw new ApiError(400, "Category must be a string");
    }

    let budgetNumber = estimatedBudget;

    if (estimatedBudget !== undefined) {
        budgetNumber = Number(estimatedBudget);

        if (Number.isNaN(budgetNumber) || budgetNumber < 0) {
            throw new ApiError(400, "Estimated budget cannot be negative");
        }
    }

    if (images !== undefined && !Array.isArray(images)) {
        throw new ApiError(400, "Images must be an array");
    }

    if (tags !== undefined && !Array.isArray(tags)) {
        throw new ApiError(400, "Tags must be an array");
    }

    const destination = await Destination.findById(id);

    if (!destination) {
        throw new ApiError(404, "Destination not found");
    }

    if (name !== undefined) destination.name = name;
    if (city !== undefined) destination.city = city;
    if (state !== undefined) destination.state = state;
    if (country !== undefined) destination.country = country;
    if (description !== undefined) destination.description = description;
    if (estimatedBudget !== undefined) destination.estimatedBudget = budgetNumber;
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
