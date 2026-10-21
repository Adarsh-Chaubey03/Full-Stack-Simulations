import { pool } from "../config/db.js";

const listRatingsForStudent = async (req, res) => {
  const { studentId } = req.params;

  if (!/^[1-9]\d*$/.test(studentId || "")) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  try {
    const result = await pool.query(
      `SELECT
         cr.rating_id,
         cr.rating,
         cr.review,
         cr.created_at,
         c.course_id,
         c.course_name,
         c.description
       FROM course_ratings cr
       JOIN courses c ON cr.course_id = c.course_id
       WHERE cr.student_id = $1
       ORDER BY cr.created_at DESC`,
      [studentId]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching student ratings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { listRatingsForStudent };