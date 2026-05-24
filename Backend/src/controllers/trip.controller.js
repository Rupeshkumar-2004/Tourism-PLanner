import mongoose from 'mongoose';
import Trip from '../models/trip.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
   addDateRangeFilter,
   addNumberRangeFilter,
   buildPaginationMeta,
   buildSelect,
   buildSort,
   parsePagination,
   regexFilter,
} from '../utils/queryFeatures.js';

const tripSortFields = [
   "title",
   "startDate",
   "endDate",
   "totalBudget",
   "createdAt"
];

const tripSelectFields = [
   "_id",
   "title",
   "description",
   "startDate",
   "endDate",
   "destinations",
   "totalBudget",
   "createdBy",
   "createdAt",
   "updatedAt"
];

// Builds the filter object for the logged-in user's trip list.
// Every trip query must include createdBy so users can only see their own trips.
const buildTripFilters = (query, userId) => {
   const filter = {
      createdBy: userId
   };

   // Search is intentionally limited to text-like fields.
   // $or means title OR description can match the search term.
   if (query.search) {
      filter.$or = [
         { title: regexFilter(query.search) },
         { description: regexFilter(query.search) }
      ];
   }

   // Adds totalBudget: { $gte, $lte } if minBudget/maxBudget are provided.
   addNumberRangeFilter(filter, query, {
      field: "totalBudget",
      minKey: "minBudget",
      maxKey: "maxBudget",
      label: "budget"
   });

   // Filters trips by their startDate field.
   // Example: ?startDate=2026-05-01&endDate=2026-05-31
   addDateRangeFilter(filter, query, {
      field: "startDate",
      startKey: "startDate",
      endKey: "endDate",
      label: "date"
   });

   return filter;
};

export const createTrip = asyncHandler(async (req, res) => {

   const { title, description, startDate, endDate, totalBudget } = req.body;

   if (
      typeof title !== "string" ||
      title.trim() === "" ||
      !startDate ||
      !endDate ||
      totalBudget === undefined
   ) {
      throw new ApiError(400, "All required fields must be provided");
   }

   const start = new Date(startDate);
   const end = new Date(endDate);

   if (Number.isNaN(start.getTime())) {
      throw new ApiError(400, "Invalid start date");
   }

   if (Number.isNaN(end.getTime())) {
      throw new ApiError(400, "Invalid end date");
   }

   if (end < start) {
      throw new ApiError(400, "End date must be after or equal to start date");
   }

   const budgetNumber = Number(totalBudget);

   if (Number.isNaN(budgetNumber) || budgetNumber < 0) {
      throw new ApiError(400, "Total budget cannot be negative");
   }

   const trip = await Trip.create({
      title,
      description,
      startDate: start,
      endDate: end,
      totalBudget: budgetNumber,
      createdBy: req.user._id
   });

   return res.status(201).json(
      new ApiResponse(
         201,
         trip,
         "Trip created successfully"
      )
   );
});

export const getUserTrips = asyncHandler(async (req, res) => {
   // Build a reusable MongoDB filter from the request query.
   // This same filter is used for countDocuments and find.
   const filter = buildTripFilters(req.query, req.user._id);

   // page/limit are strings in req.query, so parsePagination validates and converts them.
   const { page, limit, skip } = parsePagination(req.query);

   // Only approved fields can be used for sorting.
   const sortOptions = buildSort(req.query, {
      allowedFields: tripSortFields,
      defaultSortBy: "createdAt",
      defaultSortType: "desc"
   });

   // Optional field limiting: ?fields=title,totalBudget,startDate
   const selectedFields = buildSelect(req.query, tripSelectFields);

   // Count uses the same filter as find so pagination metadata stays accurate.
   const totalDocuments = await Trip.countDocuments(filter);

   // Lazy Mongoose query:
   // Trip.find(filter) creates a query object; await executes it after chaining.
   const trips = await Trip.find(filter)
      .select(selectedFields)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

   return res.status(200).json(
      new ApiResponse(
         200,
         {
            trips,
            pagination: buildPaginationMeta({
               page,
               limit,
               totalDocuments
            })
         },
         "Trips fetched successfully"
      )
   );
});

export const getTripById = asyncHandler(async (req, res) => {

   // Extract tripId from route params
   // Example:
   // GET /trips/12345
   // req.params.tripId => "12345"
   const tripId = req.params.tripId;

   if (!mongoose.isValidObjectId(tripId)) {
      throw new ApiError(400, "Invalid trip id");
   }

   // Find a single trip that:
   // 1. Matches the provided trip ID
   // 2. Belongs to the currently logged-in user
   //
   // This is an ownership-based authorization check
   // Prevents users from accessing other users' trips
   const trip = await Trip.findOne({
      _id: tripId,
      createdBy: req.user._id
   });

   // If no trip found:
   // Either:
   // - Trip ID is invalid
   // - Trip does not exist
   // - Trip belongs to another user
   if (!trip) {
      throw new ApiError(404, "Trip not found");
   }

   // Send successful response
   return res.status(200).json(
      // Standard API response structure
      new ApiResponse(
         200,
         trip,
         "Trip fetched successfully"
      )
   );
});

export const updateTripById = asyncHandler(async (req, res) => {
      
   const tripId = req.params.tripId;
   const { title, description, startDate, endDate, totalBudget } = req.body;

   if (!mongoose.isValidObjectId(tripId)) {
      throw new ApiError(400, "Invalid trip id");
   }

   if (Object.keys(req.body).length === 0) {
      throw new ApiError(400, "At least one field is required to update");
   }
   
   const trip = await Trip.findOne({
      _id: tripId,
      createdBy: req.user._id
   });

   if(!trip){
      throw new ApiError(404, 'Invalid Trip');
   }

   if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
         throw new ApiError(400, "Title cannot be empty");
      }

      trip.title = title;
   }

   if (description !== undefined) {
      trip.description = description;
   }

   if (startDate !== undefined) {
      const start = new Date(startDate);

      if (Number.isNaN(start.getTime())) {
         throw new ApiError(400, "Invalid start date");
      }

      trip.startDate = start;
   }

   if (endDate !== undefined) {
      const end = new Date(endDate);

      if (Number.isNaN(end.getTime())) {
         throw new ApiError(400, "Invalid end date");
      }

      trip.endDate = end;
   }

   if (totalBudget !== undefined) {
      const budgetNumber = Number(totalBudget);

      if(Number.isNaN(budgetNumber) || budgetNumber < 0){
         throw new ApiError(400, 'Total budget cannot be negative');
      }

      trip.totalBudget = budgetNumber;
   }

   if (trip.endDate < trip.startDate) {
      throw new ApiError(400, "End date must be after or equal to start date");
   }

   const updatedTrip = await trip.save();

   return res.status(200).json(
      new ApiResponse(
         200,
         updatedTrip,
         "Trip updated successfully"
      )
   );
});

export const deleteTripById = asyncHandler(async (req, res) => {

   const tripId = req.params.tripId;

   if (!mongoose.isValidObjectId(tripId)) {
      throw new ApiError(400, "Invalid trip id");
   }

   const trip = await Trip.findOneAndDelete({ 
                              _id: tripId,
                              createdBy: req.user._id 
                           });
   if(!trip){
      throw new ApiError(404, "Trip not found");
   }

   return res.status(200)
             .json(
               new ApiResponse(
                  200,
                  {},
                  "Deleted Successfully"
               ));
});
