import express from 'express';
import {
    createDestination,
    deleteDestinationById,
    getAllDestinations,
    getDestinationById,
    updateDestinationById,
} from '../controllers/destination.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);

router.use(verifyJWT);

router.post("/", createDestination);
router.patch("/:id", updateDestinationById);
router.delete("/:id", deleteDestinationById);

export default router;
