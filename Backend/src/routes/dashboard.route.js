import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyJWT);

router.get('/dashboard-stats', getDashboardStats);

export default router;