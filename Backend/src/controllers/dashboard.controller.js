import mongoose from "mongoose";
import Trip from "../models/trip.model.js";
import TripDestination from "../models/tripdestination.model.js";
import Destination from "../models/destination.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * GET /api/v1/dashboard/dashboard-stats
 *
 * Aggregates dashboard data in real-time from existing collections
 * instead of reading from a static document.
 *
 * Response shape:
 * {
 *   user:            { fullName, email, ProfilePicture },
 *   stats:           { upcomingTrips, destinationsVisited, savedPlaces },
 *   suggestedPlaces: [ { _id, name, city, category, coverImage } ],
 *   recentTrips:     [ { _id, title, startDate, endDate, destination, coverImage } ]
 * }
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const now = new Date();

    // ── Run all queries in parallel for speed ────────────────────
    const [
        user,
        upcomingTrips,
        destinationsVisited,
        savedPlaces,
        suggestedPlaces,
        recentTrips,
    ] = await Promise.all([
        // 1. User info (password & refreshToken already excluded by auth middleware,
        //    but we re-select here to be explicit about what the dashboard needs)
        User.findById(userId)
            .select("fullName email ProfilePicture")
            .lean(),

        // 2. Upcoming trips → trips whose startDate is in the future
        Trip.countDocuments({
            createdBy: userId,
            startDate: { $gt: now },
        }),

        // 3. Destinations visited → unique destinations across trips that have ended
        TripDestination.aggregate([
            // Join with Trip to get createdBy and endDate
            {
                $lookup: {
                    from: "trips",
                    localField: "trip",
                    foreignField: "_id",
                    as: "tripData",
                },
            },
            { $unwind: "$tripData" },
            // Only trips owned by this user that have already ended
            {
                $match: {
                    "tripData.createdBy": new mongoose.Types.ObjectId(userId),
                    "tripData.endDate": { $lt: now },
                },
            },
            // Count unique destinations
            {
                $group: { _id: "$destination" },
            },
            {
                $count: "total",
            },
        ]).then((result) => result[0]?.total ?? 0),

        // 4. Saved places → total destinations the user has added across all trips
        TripDestination.aggregate([
            {
                $lookup: {
                    from: "trips",
                    localField: "trip",
                    foreignField: "_id",
                    as: "tripData",
                },
            },
            { $unwind: "$tripData" },
            {
                $match: {
                    "tripData.createdBy": new mongoose.Types.ObjectId(userId),
                },
            },
            // Count unique destinations across all trips
            {
                $group: { _id: "$destination" },
            },
            {
                $count: "total",
            },
        ]).then((result) => result[0]?.total ?? 0),

        // 5. Suggested places (limit to 3)
        Destination.find()
            .limit(3)
            .select("name city category images")
            .lean(),

        // 6. Recent trips → user's latest 5 trips with first destination info
        Trip.find({ createdBy: userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title startDate endDate destinations")
            .populate({
                path: "destinations",
                select: "name images",
                options: { limit: 1 },
            })
            .lean(),
    ]);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // ── Shape recent trips for frontend ──────────────────────────
    const formattedRecentTrips = recentTrips.map((trip) => ({
        _id: trip._id,
        title: trip.title,
        startDate: trip.startDate,
        endDate: trip.endDate,
        destination: trip.destinations?.[0]?.name ?? "No destination",
        coverImage: trip.destinations?.[0]?.images?.[0] ?? "",
    }));

    // ── Build response matching the API model ────────────────────
    const dashboardData = {
        user: {
            fullName: user.fullName,
            email: user.email,
            ProfilePicture: user.ProfilePicture,
        },

        stats: {
            upcomingTrips,
            destinationsVisited,
            savedPlaces,
        },

        suggestedPlaces: suggestedPlaces.map((place) => ({
            _id: place._id,
            name: place.name,
            city: place.city,
            category: place.category,
            coverImage: place.images?.[0] || "",
        })),

        recentTrips: formattedRecentTrips,
    };

    return res.status(200).json(
        new ApiResponse(
            200,
            dashboardData,
            "Dashboard fetched successfully"
        )
    );
});
