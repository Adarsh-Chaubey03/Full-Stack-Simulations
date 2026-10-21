import { Router } from "express";
import { listDishes, addDish } from "../controllers/dishesController.js";

const router = Router();

router.get("/", listDishes);

// Interview task: add POST / after writing Decisions.md.
router.post("/", addDish);
export default router;
