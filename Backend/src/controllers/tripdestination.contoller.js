import mongoose from "mongoose";
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

export const addDestinationToTrip = asyncHandler(async (req, res) => {

   const tripId = req.params.tripId;
   const { destinationId, arrivalDate, departureDate, estimatedBudget, notes, order, itinerary, essentialGear } = req.body;

   if(!mongoose.isValidObjectId(tripId)){
      throw new ApiError(400, "Invalid trip id");
   }

   if(!mongoose.isValidObjectId(destinationId)){
      throw new ApiError(400, "Invalid destination id");
   }

   const trip = await Trip.findOne({
      _id: tripId,
      createdBy: req.user._id
   });

   if (!trip) {
      throw new ApiError(404, "Trip not found");
   }

   const destination = await Destination.findById(destinationId);

   if(!destination){
      throw new ApiError(404, "Destination not found");
   }

   if( arrivalDate && departureDate && new Date(departureDate) < new Date(arrivalDate)){
      throw new ApiError(400, "Departure date must be after or equal to arrival date");
   }

   if (arrivalDate && Number.isNaN(new Date(arrivalDate).getTime())) {
      throw new ApiError(400, "Invalid arrival date");
   }

   if (departureDate && Number.isNaN(new Date(departureDate).getTime())) {
      throw new ApiError(400, "Invalid departure date");
   }

   let budgetNumber = estimatedBudget;

   if(estimatedBudget !== undefined){
      budgetNumber = Number(estimatedBudget);

      if(Number.isNaN(budgetNumber) || budgetNumber < 0){
         throw new ApiError(400, "Estimated budget cannot be negative");
      }
   }

   let destinationOrder = order;

   if(destinationOrder !== undefined){ 
      destinationOrder = Number(destinationOrder);

      if(!Number.isInteger(destinationOrder) || destinationOrder < 1){
         throw new ApiError(400, "Order must be a whole number greater than 0");
      }
   }

   try {
      const tripDestination = await TripDestination.create({
         trip: trip._id,
         destination: destination._id,
         arrivalDate,
         departureDate,
         estimatedBudget: budgetNumber,
         notes,
         order: destinationOrder,
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
   const {
      arrivalDate,
      departureDate,
      estimatedBudget,
      notes,
      order,
      itinerary,
      essentialGear
   } = req.body;

   if (!mongoose.isValidObjectId(id)) {
      throw new ApiError(400, "Invalid trip destination id");
   }

   if (Object.keys(req.body).length === 0) {
      throw new ApiError(400, "At least one field is required to update");
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
      throw new ApiError(403, "You are not allowed to update this trip destination");
   }

   const nextArrivalDate = arrivalDate !== undefined ? arrivalDate : tripDestination.arrivalDate;
   const nextDepartureDate = departureDate !== undefined ? departureDate : tripDestination.departureDate;

   if (
      nextArrivalDate &&
      Number.isNaN(new Date(nextArrivalDate).getTime())
   ) {
      throw new ApiError(400, "Invalid arrival date");
   }

   if (
      nextDepartureDate &&
      Number.isNaN(new Date(nextDepartureDate).getTime())
   ) {
      throw new ApiError(400, "Invalid departure date");
   }

   if (
      nextArrivalDate &&
      nextDepartureDate &&
      new Date(nextDepartureDate) < new Date(nextArrivalDate)
   ) {
      throw new ApiError(400, "Departure date must be after or equal to arrival date");
   }

   let budgetNumber = estimatedBudget;

   if (estimatedBudget !== undefined) {
      budgetNumber = Number(estimatedBudget);

      if (Number.isNaN(budgetNumber) || budgetNumber < 0) {
         throw new ApiError(400, "Estimated budget cannot be negative");
      }
   }

   if (order !== undefined) {
      const destinationOrder = Number(order);

      if (!Number.isInteger(destinationOrder) || destinationOrder < 1) {
         throw new ApiError(400, "Order must be a whole number greater than 0");
      }

      tripDestination.order = destinationOrder;
   }

   if (arrivalDate !== undefined) tripDestination.arrivalDate = arrivalDate;
   if (departureDate !== undefined) tripDestination.departureDate = departureDate;
   if (estimatedBudget !== undefined) tripDestination.estimatedBudget = budgetNumber;
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
   const { tripId, destinationId, place } = req.body;

   if (!mongoose.isValidObjectId(tripId) || !mongoose.isValidObjectId(destinationId)) {
      throw new ApiError(400, "Invalid trip or destination ID");
   }

   if (!place || !place.name) {
      throw new ApiError(400, "Valid place object is required");
   }

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
