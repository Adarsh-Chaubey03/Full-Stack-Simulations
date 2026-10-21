import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../config/db.js";
const here = path.dirname(fileURLToPath(import.meta.url));
try {
 await pool.query(fs.readFileSync(path.join(here, "schema.sql"), "utf8"));
 const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM students");
 if (rows[0].count === 0) {
  await pool.query("INSERT INTO students (name) VALUES ($1), ($2), ($3)", ["Aarav Sharma", "Priya Singh", "Kabir Mehta"]);
  await pool.query("INSERT INTO courses (title, instructor) VALUES ($1,$2),($3,$4),($5,$6),($7,$8)", ["Data Structures","Dr. Rao","Database Systems","Prof. Iyer","Web Development","Ms. Kapoor","Operating Systems","Dr. Sen"]);
  await pool.query("INSERT INTO course_ratings (student_id, course_id, rating, review) VALUES (1,1,5,'Clear explanations'),(1,2,4,'Useful assignments'),(2,2,5,'Very practical'),(2,3,4,'Good projects'),(3,1,3,'Could use more examples')");
 }
 console.log("Schema ready; sample data seeded if tables were empty.");
} catch (e) { console.error("Database initialization failed:", e.message); process.exitCode = 1; }
finally { await pool.end(); }
