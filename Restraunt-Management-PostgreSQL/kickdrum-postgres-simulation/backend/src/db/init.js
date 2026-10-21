import "dotenv/config";
import { readFile } from "node:fs/promises";
import { pool } from "../config/db.js";

async function init() {
  try {
    const schema = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
    await pool.query(schema);

    const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM dishes");
    if (rows[0].count === 0) {
      await pool.query(
        `INSERT INTO dishes (name, category, price, available)
         VALUES ($1,$2,$3,$4), ($5,$6,$7,$8), ($9,$10,$11,$12), ($13,$14,$15,$16)`,
        ["Paneer Tikka","Starter",220,true,"Masala Dosa","Main Course",160,true,
         "Gulab Jamun","Dessert",90,true,"Cold Coffee","Beverage",120,false]
      );
    }
    console.log("Database schema ready; seed data checked.");
  } catch (err) {
    console.error("Database initialization failed:", err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

await init();
