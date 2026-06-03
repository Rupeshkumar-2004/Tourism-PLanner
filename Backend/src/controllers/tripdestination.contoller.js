import mongoose from "mongoose";
import { z } from "zod";
import Destination from "../models/destination.model.js";
import Trip from "../models/trip.model.js";
import TripDestination from "../models/tripdestination.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
   addNumberRangeFilter,
   buildPaginationMeta,
   buildSort,
   parsePagination,
} from "../utils/queryFeatures.js";

const tripDestinationSortFields = [
   "order",
   "arrivalDate",
   "departureDate",
   "estimatedBudget",
   "createdAt"
];

// Builds filters for destinations inside a specific trip.
// trip is always included so this endpoint never returns destinations
// from another trip.
const buildTripDestinationFilters = (query, tripId) => {
   const filter = {
      trip: tripId
   };

   // Supports ?minBudget=1000&maxBudget=5000 for trip destination costs.
   addNumberRangeFilter(filter, query, {
      field: "estimatedBudget",
      minKey: "minBudget",
      maxKey: "maxBudget",
      label: "budget"
   });

   return filter;
};

const itinerarySchema = z.array(z.object({
   dayNumber: z.number().int().min(1),
   activities: z.array(z.any()).optional()
}));

const addDestinationSchema = z.object({
   destinationId: z.string().refine(val => mongoose.isValidObjectId(val), 'Invalid destination id'),
   arrivalDate: z.coerce.date().optional(),
   departureDate: z.coerce.date().optional(),
   estimatedBudget: z.coerce.number().min(0, "Estimated budget cannot be negative").optional(),
   notes: z.string().optional(),
   order: z.coerce.number().int().min(1, "Order must be a whole number greater than 0").optional(),
   itinerary: itinerarySchema.optional(),
   essentialGear: z.array(z.string()).optional()
}).refine(data => {
   if (data.arrivalDate && data.departureDate) {
      return data.departureDate >= data.arrivalDate;
   }
   return true;
}, {
   message: 'Departure date must be after or equal to arrival date',
   path: ['departureDate']
});

const updateDestinationSchema = z.object({
   arrivalDate: z.coerce.date().optional(),
   departureDate: z.coerce.date().optional(),
   estimatedBudget: z.coerce.number().min(0, "Estimated budget cannot be negative").optional(),
   notes: z.string().optional(),
   order: z.coerce.number().int().min(1, "Order must be a whole number greater than 0").optional(),
   itinerary: itinerarySchema.optional(),
   essentialGear: z.array(z.string()).optional()
});

const addPlaceSchema = z.object({
   tripId: z.string().refine(val => mongoose.isValidObjectId(val), 'Invalid trip id'),
   destinationId: z.string().refine(val => mongoose.isValidObjectId(val), 'Invalid destination id'),
   place: z.object({
      name: z.string().min(1, "Valid place object with a name is required"),
      description: z.string().optional(),
      category: z.string().optional(),
      images: z.array(z.string()).optional(),
      address: z.string().optional()
   })
});

export const addDestinationToTrip = asyncHandler(async (req, res) => {
   const tripId = req.params.tripId;

   if (!mongoose.isValidObjectId(tripId)) {
      throw new ApiError(400, "Invalid trip id");
   }

   const parsed = addDestinationSchema.safeParse(req.body);
   if (!parsed.success) {
      throw new ApiError(400, parsed.error.errors.map(err => err.message).join(', '));
   }

   const { destinationId, arrivalDate, departureDate, estimatedBudget, notes, order, itinerary, essentialGear } = parsed.data;

   const trip = await Trip.findOne({
      _id: tripId,
      createdBy: req.user._id
   });

   if (!trip) {
      throw new ApiError(404, "Trip not found");
   }

   const destination = await Destination.findById(destinationId);

   if (!destination) {
      throw new ApiError(404, "Destination not found");
   }

   try {
      const tripDestination = await TripDestination.create({
         trip: trip._id,
         destination: destination._id,
         arrivalDate,
         departureDate,
         estimatedBudget,
         notes,
         order,
         itinerary: itinerary || [],
         essentialGear: essentialGear || []
      });

      return res.status(201).json(
         new ApiResponse(
            201,
            tripDestination,
            "Destination added to trip successfully"
         )
      );
   } catch (error) {
    //specific error code for duplicate key voilation..
      if (error.code === 11000) {
         throw new ApiError(
            409,
            "Destination is already added to this trip or order is already used"
         );
      }

      throw error;
   }
});

export const getTripDestinations = asyncHandler(async (req, res) => {

    const tripId = req.params.tripId;

    // Validate before querying; invalid ObjectIds can cause unnecessary DB work.
    if(!mongoose.isValidObjectId(tripId)){
      throw new ApiError(400, "Invalid trip id");
   }

    // Ownership check:
    // the trip must exist and must belong to the logged-in user.
    const trip = await Trip.findOne({
        _id: tripId,
        createdBy: req.user._id
    });

    if(!trip){
        throw new ApiError(404, "Trip Not found");
    }

    // Build the filter once and reuse it for both count and data query.
    const filter = buildTripDestinationFilters(req.query, tripId);

    // Validates page/limit and gives us the skip value for MongoDB.
    const { page, limit, skip } = parsePagination(req.query);

    // Default ordering is by itinerary order ascending.
    const sortOptions = buildSort(req.query, {
      allowedFields: tripDestinationSortFields,
      defaultSortBy: "order",
      defaultSortType: "asc"
    });

    // Total matching rows before pagination.
    const totalDocuments = await TripDestination.countDocuments(filter);

    // populate joins the referenced Destination document.
    // It is similar to a simple lookup, but handled by Mongoose.
    const destinations = await TripDestination.find(filter)
                                .populate( "destination", "name city state country images tags estimatedBudget")
                                .sort(sortOptions)
                                .skip(skip)
                                .limit(limit);

    return res.status(200)
       .json( new ApiResponse(
            200,
            {
               destinations,
               pagination: buildPaginationMeta({
                  page,
                  limit,
                  totalDocuments
               })
            },
            "Destinations Fetched Successfully"
       ));
});

export const updateTripDestinationById = asyncHandler(async (req, res) => {
   const { id } = req.params;

   if (!mongoose.isValidObjectId(id)) {
      throw new ApiError(400, "Invalid trip destination id");
   }

   if (Object.keys(req.body).length === 0) {
      throw new ApiError(400, "At least one field is required to update");
   }

   const parsed = updateDestinationSchema.safeParse(req.body);
   if (!parsed.success) {
      throw new ApiError(400, parsed.error.errors.map(err => err.message).join(', '));
   }

   const { arrivalDate, departureDate, estimatedBudget, notes, order, itinerary, essentialGear } = parsed.data;

   const tripDestination = await TripDestination.findById(id);

   if (!tripDestination) {
      throw new ApiError(404, "Trip destination not found");
   }

   const trip = await Trip.findOne({
      _id: tripDestination.trip,
      createdBy: req.user._id
   });

   if (!trip) {
      throw new ApiError(403, "You are not allowed to update this trip destination");
   }

   const nextArrivalDate = arrivalDate !== undefined ? arrivalDate : tripDestination.arrivalDate;
   const nextDepartureDate = departureDate !== undefined ? departureDate : tripDestination.departureDate;

   if (nextArrivalDate && nextDepartureDate && nextDepartureDate < nextArrivalDate) {
      throw new ApiError(400, "Departure date must be after or equal to arrival date");
   }

   if (order !== undefined) tripDestination.order = order;
   if (arrivalDate !== undefined) tripDestination.arrivalDate = arrivalDate;
   if (departureDate !== undefined) tripDestination.departureDate = departureDate;
   if (estimatedBudget !== undefined) tripDestination.estimatedBudget = estimatedBudget;
   if (notes !== undefined) tripDestination.notes = notes;
   if (itinerary !== undefined) tripDestination.itinerary = itinerary;
   if (essentialGear !== undefined) tripDestination.essentialGear = essentialGear;

   try {
      const updatedTripDestination = await tripDestination.save();

      return res.status(200).json(
         new ApiResponse(
            200,
            updatedTripDestination,
            "Trip destination updated successfully"
         )
      );
   } catch (error) {
      if (error.code === 11000) {
         throw new ApiError(409, "Order is already used in this trip");
      }

      throw error;
   }
});

export const deleteTripDestinationById = asyncHandler(async (req, res) => {

   const { id } = req.params;

   if (!mongoose.isValidObjectId(id)) {
      throw new ApiError(400, "Invalid trip destination id");
   }

   const tripDestination = await TripDestination.findById(id);

   if (!tripDestination) {
      throw new ApiError(404, "Trip destination not found");
   }

   const trip = await Trip.findOne({
      _id: tripDestination.trip,
      createdBy: req.user._id
   });

   if (!trip) {
      throw new ApiError(403, "You are not allowed to delete this trip destination");
   }

   await TripDestination.findByIdAndDelete(id);

   return res.status(200).json(
      new ApiResponse(
         200,
         {},
         "Trip destination deleted successfully"
      )
   );
});

export const addPlaceToItinerary = asyncHandler(async (req, res) => {
   const parsed = addPlaceSchema.safeParse(req.body);
   
   if (!parsed.success) {
      throw new ApiError(400, parsed.error.errors.map(err => err.message).join(', '));
   }

   const { tripId, destinationId, place } = parsed.data;

   // Ensure the trip exists and belongs to the user
   const trip = await Trip.findOne({ _id: tripId, createdBy: req.user._id });
   if (!trip) {
      throw new ApiError(404, "Trip not found");
   }

   // 1. Find or Create the TripDestination
   let tripDestination = await TripDestination.findOne({ trip: tripId, destination: destinationId });

   if (!tripDestination) {
      // Create it if it doesn't exist
      tripDestination = await TripDestination.create({
         trip: tripId,
         destination: destinationId,
         itinerary: [{
            dayNumber: 1,
            activities: []
         }]
      });
   }

   // 2. Find "Day 1" in the itinerary, or create it if missing
   let dayOne = tripDestination.itinerary.find(day => day.dayNumber === 1);
   if (!dayOne) {
      dayOne = { dayNumber: 1, activities: [] };
      tripDestination.itinerary.push(dayOne);
   }

   // 3. Append the Place as an activity
   dayOne.activities.push({
      title: place.name,
      description: place.description || "",
      activityType: place.category || "attraction",
      imageUrl: (place.images && place.images.length > 0) ? place.images[0] : "",
      locationInfo: place.address || ""
   });

   await tripDestination.save();

   return res.status(200).json(
      new ApiResponse(200, tripDestination, "Place successfully added to your itinerary")
   );
});
