import { pool } from "../config/db.js";

export async function listDishes(req, res) {
  const search = String(req.query.search || "").trim();
  try {
    const values = [];
    let sql = "SELECT id, name, category, price, available FROM dishes";
    if (search) {
      values.push(`%${search}%`);
      sql += " WHERE name ILIKE $1";
    }
    sql += " ORDER BY id ASC";
    const { rows } = await pool.query(sql, values);
    res.status(200).json({
      data: rows.map((dish) => ({ ...dish, price: Number(dish.price) })),
      count: rows.length
    });
  } catch {
    res.status(500).json({ message: "Could not load dishes" });
  }
}

// Interview task: implement the create-dish controller after planning.
export const addDish = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof category !== "string" || !category.trim() ||
      price === undefined || price === null ||
      price === "" || !Number.isFinite(Number(price)) ||
      Number(price) < 0
    ) {
      return res.status(400).json({ message: "Invalid dish input" });
    }

    const result = await pool.query(
      `INSERT INTO dishes (name, category, price)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name.trim(), category.trim(), Number(price)]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Dish already exists" });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};