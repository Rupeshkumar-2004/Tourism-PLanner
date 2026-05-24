import { ApiError } from "./ApiError.js";

// Central defaults for all paginated APIs.
// Keeping these in one place prevents different controllers from accidentally
// using different page sizes or different maximum limits.
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

// User input can contain regex special characters like "." or "*".
// If we put those directly inside $regex, MongoDB treats them as regex syntax.
// Escaping makes the search behave like normal text search and avoids unsafe patterns.
const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Creates a case-insensitive MongoDB regex filter.
// Example: regexFilter("goa") => { $regex: "goa", $options: "i" }
export const regexFilter = (value) => ({
    $regex: escapeRegex(value),
    $options: "i",
});

// Converts comma-separated query values into a case-insensitive OR-style filter.
// Example: ?city=Goa,Mysore becomes { $in: [/Goa/i, /Mysore/i] }
export const regexInFilter = (value) => ({
    $in: String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => new RegExp(escapeRegex(item), "i")),
});

// Reads page/limit from req.query, validates them, and calculates skip.
// Controllers use the returned skip/limit directly in Mongoose queries.
export const parsePagination = (query, options = {}) => {
    const maxLimit = options.maxLimit || MAX_LIMIT;
    const defaultLimit = options.defaultLimit || DEFAULT_LIMIT;

    // Query params always arrive as strings, so Number(...) is required here.
    const page = Number(query.page || 1);
    const limit = Number(query.limit || defaultLimit);

    // Page must be a whole number starting from 1.
    if (Number.isNaN(page) || !Number.isInteger(page) || page < 1) {
        throw new ApiError(400, "Invalid page number");
    }

    // Limit must also be a positive whole number.
    if (Number.isNaN(limit) || !Number.isInteger(limit) || limit < 1) {
        throw new ApiError(400, "Invalid limit");
    }

    // Hard limit protects the database from very large requests like ?limit=100000.
    if (limit > maxLimit) {
        throw new ApiError(400, `Limit cannot exceed ${maxLimit}`);
    }

    return {
        page,
        limit,
        // MongoDB skip formula:
        // page 1 -> skip 0, page 2 with limit 10 -> skip 10.
        skip: (page - 1) * limit,
    };
};

// Builds the metadata object frontend needs for pagination controls.
// Important: totalDocuments must come from countDocuments(filter), using the
// same filter object that is used for find(filter).
export const buildPaginationMeta = ({ page, limit, totalDocuments }) => {
    // Math.ceil keeps the last partially-filled page.
    // Example: 52 documents / 10 limit = 5.2 => 6 pages.
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        page,
        limit,
        totalDocuments,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
};

// Validates sorting query params and converts them into a Mongoose sort object.
// Example: ?sortBy=createdAt&sortType=desc => { createdAt: -1 }
export const buildSort = (
    query,
    { allowedFields, defaultSortBy = "createdAt", defaultSortType = "desc" }
) => {
    const sortBy = query.sortBy || defaultSortBy;
    const sortType = query.sortType || defaultSortType;
    const allowedSortTypes = ["asc", "desc"];

    // Without this check, random values could silently become descending sort.
    if (!allowedSortTypes.includes(sortType)) {
        throw new ApiError(400, "sortType must be asc or desc");
    }

    // Only allow known database fields to prevent unsafe or expensive sorting.
    if (!allowedFields.includes(sortBy)) {
        throw new ApiError(400, "Invalid sort field");
    }

    return {
        // Computed property name: the value of sortBy becomes the object key.
        // If sortBy is "name", this returns { name: 1 } or { name: -1 }.
        [sortBy]: sortType === "asc" ? 1 : -1,
    };
};

// Supports field limiting through ?fields=name,city,country.
// This keeps API responses smaller and applies an allow-list for safety.
export const buildSelect = (query, allowedFields = []) => {
    if (!query.fields) {
        // Hide Mongoose's internal version field by default.
        return "-__v";
    }

    const fields = String(query.fields)
        .split(",")
        .map((field) => field.trim())
        .filter(Boolean);

    // If the client sends ?fields=,,, then fall back to the default projection.
    if (fields.length === 0) {
        return "-__v";
    }

    // Reject fields that the API does not explicitly support.
    const invalidField = fields.find((field) => !allowedFields.includes(field));

    if (invalidField) {
        throw new ApiError(400, `Invalid field selection: ${invalidField}`);
    }

    // Mongoose select expects fields separated by spaces, not commas.
    return fields.join(" ");
};

// Adds a numeric range condition to an existing Mongo filter object.
// Example: minBudget=1000&maxBudget=5000 becomes
// { estimatedBudget: { $gte: 1000, $lte: 5000 } }
export const addNumberRangeFilter = (
    filter,
    query,
    { field, minKey, maxKey, label = field }
) => {
    const minValue = query[minKey];
    const maxValue = query[maxKey];

    // If neither boundary exists, the controller should not filter this field.
    if (!minValue && !maxValue) {
        return;
    }

    // Convert string query values into real numbers before MongoDB comparison.
    const minNumber = Number(minValue);
    const maxNumber = Number(maxValue);

    if (minValue && Number.isNaN(minNumber)) {
        throw new ApiError(400, `Invalid minimum ${label}`);
    }

    if (maxValue && Number.isNaN(maxNumber)) {
        throw new ApiError(400, `Invalid maximum ${label}`);
    }

    // A range like min=5000&max=1000 can never match correctly, so reject it.
    if (minValue && maxValue && minNumber > maxNumber) {
        throw new ApiError(400, `Minimum ${label} cannot be greater than maximum ${label}`);
    }

    // Create the nested MongoDB operator object dynamically.
    filter[field] = {};

    if (minValue) {
        // $gte means greater than or equal.
        filter[field].$gte = minNumber;
    }

    if (maxValue) {
        // $lte means less than or equal.
        filter[field].$lte = maxNumber;
    }
};

// Adds a date range condition to an existing Mongo filter object.
// Useful for queries like ?startDate=2026-01-01&endDate=2026-01-31.
export const addDateRangeFilter = (
    filter,
    query,
    { field, startKey, endKey, label = "date" }
) => {
    const startValue = query[startKey];
    const endValue = query[endKey];

    // Do nothing when the request has no date range params.
    if (!startValue && !endValue) {
        return;
    }

    // MongoDB stores Date fields as Date objects, so query strings must be parsed.
    const startDate = startValue ? new Date(startValue) : null;
    const endDate = endValue ? new Date(endValue) : null;

    if (startValue && Number.isNaN(startDate.getTime())) {
        throw new ApiError(400, `Invalid start ${label}`);
    }

    if (endValue && Number.isNaN(endDate.getTime())) {
        throw new ApiError(400, `Invalid end ${label}`);
    }

    // Prevent impossible date ranges.
    if (startDate && endDate && endDate < startDate) {
        throw new ApiError(400, `End ${label} must be after or equal to start ${label}`);
    }

    // Build a MongoDB range object only after validation passes.
    filter[field] = {};

    if (startDate) {
        filter[field].$gte = startDate;
    }

    if (endDate) {
        filter[field].$lte = endDate;
    }
};
