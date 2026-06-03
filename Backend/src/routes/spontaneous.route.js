import { Router } from "express";
import { getSpontaneousAdventures } from "../controllers/spontaneous.controller.js";

const router = Router();

router.route("/").get(getSpontaneousAdventures);

export default router;
