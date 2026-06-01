import express from 'express';
import { getPlacesByDestination } from '../controllers/place.controller.js';

const router = express.Router();

router.get("/", getPlacesByDestination);

export default router;
