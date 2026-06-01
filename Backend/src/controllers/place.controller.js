import mongoose from "mongoose";
import Place from "../models/place.model.js";
import Destination from "../models/destination.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getPlacesByDestination = asyncHandler(async (req, res) => {
    const { destinationId } = req.query;

    if (!destinationId || !mongoose.isValidObjectId(destinationId)) {
        throw new ApiError(400, "Valid destinationId is required");
    }

    // 1. Check if we have places for this destination in the DB
    let places = await Place.find({ destination: destinationId });

    // 2. Read-Through Cache Logic
    if (places.length === 0) {
        console.log(`Cache miss for places in destination ${destinationId}. Fetching from external API...`);
        
        try {
            // Find the destination to get its coordinates/city name
            const destination = await Destination.findById(destinationId);
            
            if (!destination) {
                throw new ApiError(404, "Destination not found");
            }

            const { fetchAndFormatPlaces } = await import("../services/externalApi.service.js");
            const newPlacesData = await fetchAndFormatPlaces(destination);

            if (newPlacesData && newPlacesData.length > 0) {
                console.log(`Found ${newPlacesData.length} new places. Saving to DB...`);
                
                try {
                    await Place.insertMany(newPlacesData, { ordered: false });
                } catch (insertError) {
                    // Ignore duplicate key errors silently
                    if (insertError.code !== 11000 && insertError.name !== 'BulkWriteError') {
                        console.error("DB Insert Error during cache fill:", insertError);
                    }
                }

                // Re-fetch from DB to get the newly created records with ObjectIds
                places = await Place.find({ destination: destinationId });
            }
        } catch (error) {
            console.error("External API Place Cache Error:", error);
            // Fail gracefully, don't crash
        }
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            places,
            "Places fetched successfully"
        )
    );
});
