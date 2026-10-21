import { Router } from "express";
import { listDishes, addDish } from "../controllers/dishesController.js";

const router = Router();

router.get("/", listDishes);
router.post("/",addDish);


// Interview task: add the create-dish route yourself.
// First explain the route flow and write Decisions.md.

export default router;
