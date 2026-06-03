import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Helper function to generate tokens
// Keeps controller clean and reusable
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, 'User not found while generating tokens');
        }

        // These are instance methods defined in your model
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // Store refresh token in DB
        // This allows logout + token revocation later
        user.refreshToken = refreshToken;

        // Skip validation for speed (we are only updating one field)
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, 'Something went wrong while generating tokens');
    }
};

const registerSchema = z.object({
    fullName: z.string().trim().min(1, 'Full name is required'),
    email: z.string().trim().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['user', 'admin']).optional(),
    phone: z.string().regex(/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number').optional()
});

const loginSchema = z.object({
    email: z.string().trim().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
});

// ---------------- REGISTER ----------------

export const registerUser = asyncHandler(async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, parsed.error.errors.map(e => e.message).join(', '));
    }

    const { fullName, email, password, role, phone } = parsed.data;

    // Check if user already exists
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
        throw new ApiError(409, 'User with this email already exists');
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    try {
        // Create user in DB
        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            phone,
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(409, 'User with this email already exists');
        }

        throw error;
    }

    // Never send password or refreshToken to client
    const createdUser = await User.findById(user._id)
        .select('-password -refreshToken');

    if (!createdUser) {
        throw new ApiError(500, 'User creation failed');
    }

    // Generate tokens (auto login after signup)
    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    // Cookie options (VERY IMPORTANT)
    const options = {
        httpOnly: true,
        // JS on frontend CANNOT access this → protects from XSS

        secure: process.env.NODE_ENV === 'production',
        // Only sent over HTTPS in production

        sameSite: 'strict',
        // Prevents CSRF attacks (cross-site requests)

        maxAge: 7 * 24 * 60 * 60 * 1000
        // Cookie expiry (7 days)
    };

    return res
        .status(201)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                201,
                {
                    user: createdUser,
                    accessToken,
                    refreshToken
                },
                'User created successfully'
            )
        );
});

// ---------------- LOGIN ----------------

export const loginUser = asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, parsed.error.errors.map(e => e.message).join(', '));
    }

    const { email, password } = parsed.data;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Compare password (IMPORTANT)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Generate tokens
    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    // Remove sensitive fields
    const loggedInUser = await User.findById(user._id)
        .select('-password -refreshToken');

    // Same cookie config
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                'User logged in successfully'
            )
        );
});

// ---------------- REFRESH ACCESS TOKEN ----------------

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, 'Refresh token is required');
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id).select('-password');

        if (!user) {
            throw new ApiError(401, 'Invalid refresh token');
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, 'Refresh token is expired or already used');
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken
                    },
                    'Access token refreshed successfully'
                )
            );

    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(401, 'Invalid or expired refresh token');
    }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        )
    );
});
