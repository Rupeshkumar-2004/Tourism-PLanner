import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createTrip, getUserTrips, getTripById, updateTripById, deleteTripById } from '../controllers/trip.controller.js';

const router = express.Router();

router.use(verifyJWT);

router.post("/", createTrip);
router.get("/", getUserTrips);
router.get("/:tripId", getTripById);
router.patch("/:tripId", updateTripById);
router.delete("/:tripId", deleteTripById);

export default router;
