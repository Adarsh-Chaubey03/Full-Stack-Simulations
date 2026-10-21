import { Router } from "express";
import { listRatingsForStudent } from "../controllers/ratingsController.js";
const router = Router();
// TODO: Register GET /student/:studentId

router.get("/student/:studentId", listRatingsForStudent);
export default router;
