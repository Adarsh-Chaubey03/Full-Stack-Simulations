import { Router } from "express";
import { listStudents } from "../controllers/studentsController.js";
const router = Router();
router.get("/", listStudents);
export default router;
