// Global error handling middleware
// This catches all errors passed using next(err)

const errorMiddleware = (err, req, res, next) => {

    // If error has a statusCode (from ApiError), use it
    // Otherwise default to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;

    // Send structured JSON response
    res.status(statusCode).json({
        success: false, // indicates failure
        message: err.message || "Internal Server Error",

        // Send detailed errors if available (useful for validation)
        errors: err.errors || [],

        // Stack trace only in development (never expose in production)
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};

export { errorMiddleware };