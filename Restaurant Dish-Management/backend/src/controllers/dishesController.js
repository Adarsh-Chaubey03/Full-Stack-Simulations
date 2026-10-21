import { dishes } from "../data/dishes.js";

export function listDishes(req, res) {
  const search = String(req.query.search || "").trim().toLowerCase();
  const result = search
    ? dishes.filter((dish) => dish.name.toLowerCase().includes(search))
    : dishes;

  res.status(200).json({ data: result, count: result.length });
}

// Interview task: implement the create-dish controller after planning.

const addDish = (req, res) => {
  const { name, category, price } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof category !== "string" ||
    !category.trim() ||
    price === undefined ||
    price === null ||
    price === "" ||
    !Number.isFinite(Number(price)) ||
    Number(price) <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Name, category and a valid positive price are required"
    });
  }

  const dishName = name.trim();

  const exists = dishes.some(
    (dish) => dish.name.toLowerCase() === dishName.toLowerCase()
  );

  if (exists) {
    return res.status(409).json({
      success: false,
      message: "Dish already exists"
    });
  }

  const dish = {
    id: dishes.length
      ? Math.max(...dishes.map((d) => Number(d.id) || 0)) + 1
      : 1,
    name: dishName,
    category: category.trim(),
    price: Number(price)
  };

  dishes.push(dish);

  return res.status(201).json({
    success: true,
    message: "Dish added successfully",
    data: dish
  });
};

export { addDish };