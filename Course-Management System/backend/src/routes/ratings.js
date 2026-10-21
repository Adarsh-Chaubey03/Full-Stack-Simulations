import { Router } from "express";
import { listRatingsForStudent } from "../controllers/ratingsController.js";
const router = Router();

router.get("/student/:studentId", listRatingsForStudent);
export default router;
