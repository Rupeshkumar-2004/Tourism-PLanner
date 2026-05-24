/*
==================== GLOBAL ERROR HANDLING ====================

Handles unhandled promise rejections
Example:
- DB failure not caught
- Async errors outside asyncHandler

Prevents silent failures
*/

// Handle synchronous errors FIRST
process.on('uncaughtException', (err) => {
    console.error(' Uncaught Exception:', err);
    process.exit(1);
});

import dotenv from 'dotenv';
import connectDB from './database/db.js';
import app from './App.js';

// Load environment variables from .env file
// Must be called before using process.env
dotenv.config({ path: './.env' });

// Store the running HTTP server instance.
// This lets us close the server gracefully if an unhandled async error occurs.
let server;

/*
==================== SERVER STARTUP FLOW ====================

1. Connect to database first
2. If successful → start server
3. If failed → stop application

This prevents running backend without DB connection
*/

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;

        // Start Express server only after DB is connected
        // app.listen returns the actual server object.
        // Saving it makes server.close(...) possible later.
        server = app.listen(PORT, () => {
            console.log(` Server is running on http://localhost:${PORT}`);
            console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    })
    .catch((err) => {
        // If DB connection fails → log error and stop app
        console.error(" MongoDB connection failed!", err);
        process.exit(1);
    });


// this for async errors..
process.on('unhandledRejection', (err) => {
    console.error(' Unhandled Rejection:', err);

    // If the server has already started, close it before exiting.
    // This avoids abruptly dropping open connections.
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});
