import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

/*
==================== CORS MIDDLEWARE ====================

- Controls which origins (frontend URLs) can access backend
- Important for security (prevents unauthorized cross-origin requests)

Callback usage:
callback(null, true)  → allow request
callback(error, false) → block request
*/

app.use(cors({
    origin: function (origin, callback) {

        // Allow requests with no origin (e.g., Postman, mobile apps)
        if (!origin) return callback(null, true);

        // Allow localhost during development
        if (origin.startsWith('http://localhost') || origin.startsWith('https://localhost')){
          return callback(null, true);
        }

        // Allow specific production origin from environment variable
        if (origin === process.env.CORS_ORIGIN) return callback(null, true);

        // Reject all other origins
        const message = 'CORS policy does not allow access from this origin';

        return callback(new Error(message), false);
    },

    // Allows cookies / authentication headers to be sent
    credentials: true
}));

/*
==================== BODY PARSING MIDDLEWARE ====================

These middlewares extract data from incoming requests

*/

// Parse JSON data from request body
// Limit prevents large payload attacks
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

/*
==================== STATIC FILES ====================

Serves files from "public" folder directly
Example:
public/image.png → accessible at /image.png
*/
app.use(express.static("public"));

/*
==================== COOKIE PARSER ====================

Allows access to cookies via req.cookies
Used for authentication (tokens, sessions)
*/
app.use(cookieParser());

import authRouter from './routes/auth.route.js';
import destinationRouter from './routes/destination.route.js';
import tripRouter from './routes/trip.route.js';
import tripDestinationRouter from './routes/tripdestination.route.js';

//for User
app.use("/api/v1/auth", authRouter);

//for Trips
app.use("/api/v1/trips", tripRouter);
app.use("/api/v1/destinations", destinationRouter);
app.use("/api/v1", tripDestinationRouter);

/*
==================== HEALTH CHECK ROUTE ====================

Simple route to verify server is running
Useful for:
- testing
- deployment checks
*/
app.get('/', (req, res) => {
    res.json({
        message: 'Tourism API is running',
        status: 'success'
    });
});


//after all the routes
app.use(errorMiddleware);

export default app;
