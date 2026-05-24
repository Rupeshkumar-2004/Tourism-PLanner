import express from 'express';
import {
    addDestinationToTrip,
    deleteTripDestinationById,
    getTripDestinations,
    updateTripDestinationById,
} from '../controllers/tripdestination.contoller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyJWT);

router.post('/trips/:tripId/destinations', addDestinationToTrip);
router.get('/trips/:tripId/destinations',  getTripDestinations);
router.patch('/trip-destinations/:id', updateTripDestinationById);
router.delete('/trip-destinations/:id', deleteTripDestinationById);

export default router;
