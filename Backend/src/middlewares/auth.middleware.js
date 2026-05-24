import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {

    //Get token from cookies OR header
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    //If token not present
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    let decodedToken;

    try {
        //Verify token
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(401, "Invalid or expired access token");
    }

    // Find user using _id from token
    const user = await User.findById(decodedToken?._id)
        .select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid access token");
    }

    //Attach user to request
    req.user = user;

    //Move forward
    next();
});
