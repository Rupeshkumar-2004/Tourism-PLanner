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

/*
In backend development, specifically within the Node.js environment, the process object is a global instance that provides information about, and control over, the current running program. Since it is global, you don't need to require it; it’s always available to help your application interact with the operating system.

1. What is the process Object?
Think of the process object as the bridge between your JavaScript code and the computer's operating system. It allows you to:
  - Check the current working directory.
  - Read environment variables (like database passwords).
  - Kill the application if an error occurs.
  - Listen for specific system events.

2. What is process.on()?
The process object is an instance of an EventEmitter. The process.on() method is used to register event listeners. It tells your application: "When this specific thing happens to the system process, run this function."

Common Events in process.on():
  - uncaughtException:  Triggered when a JavaScript error isn't caught by a try-catch block. It’s a last resort to log the error before the app crashes.
  - unhandledRejection: Triggered when a Promise is rejected but there is no .catch() handler attached to it.
  - exit:               Triggered when the process is about to shut down. You cannot perform asynchronous work here.
  - SIGINT:             Triggered when you press Ctrl+C in the terminal. Useful for "Graceful Shutdowns."
  - SIGTERM:            A "termination signal" usually sent by hosting platforms (like Heroku or Docker) to tell your app to stop politely.

3. Why is it Used?
  A. Graceful Shutdowns
     If your server is in the middle of saving a large file or updating a database, you don't want it to just "die" when you stop the process. You use process.on('SIGINT', ...) to close database connections and finish tasks before fully exiting.
  
  B. Error Monitoring
     In production, you don't want your server to crash silently. By listening for uncaughtException, you can log the error to a service (like Sentry) so you know exactly what went wrong.
  
  C. Environment Configuration
     While not an event listener, process.env is the most used part of the process object, allowing you to switch between "Development" and "Production" modes without changing your code.
*/

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
