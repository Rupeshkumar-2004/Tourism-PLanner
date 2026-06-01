import express from 'express';
import {
    createDestination,
    deleteDestinationById,
    getAllDestinations,
    getDestinationById,
    updateDestinationById,
    getDestinationWeather
} from '../controllers/destination.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.get("/:id/weather", getDestinationWeather);

router.use(verifyJWT);

router.post("/", createDestination);
router.patch("/:id", updateDestinationById);
router.delete("/:id", deleteDestinationById);

export default router;
