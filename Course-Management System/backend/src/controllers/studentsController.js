import { pool } from "../config/db.js";
export async function listStudents(_req, res) {
 try { const result = await pool.query("SELECT id, name FROM students ORDER BY name"); res.json(result.rows); }
 catch (error) { console.error("listStudents:", error.message); res.status(500).json({ message: "Failed to load students" }); }
}
