import { useEffect, useState } from "react";
import { fetchRatingsForStudent, fetchStudents } from "./api.js";
export default function App() {
 const [students, setStudents] = useState([]);
 const [selectedStudentId, setSelectedStudentId] = useState("");
 const [ratings, setRatings] = useState([]);
 const [error, setError] = useState("");
 const [loadingStudents, setLoadingStudents] = useState(true);
 const [loadingRatings, setLoadingRatings] = useState(false);
 useEffect(() => {
  fetchStudents().then((data) => { setStudents(data); if (data.length) setSelectedStudentId(String(data[0].id)); })
   .catch((err) => setError(err.message)).finally(() => setLoadingStudents(false));
 }, []);
 useEffect(() => {
  if (!selectedStudentId) return;
  setLoadingRatings(true);
  setError("");
  fetchRatingsForStudent(selectedStudentId).then(setRatings)
   .catch((err) => setError(err.message)).finally(() => setLoadingRatings(false));
 }, [selectedStudentId]);
 return <main className="page">
  <p className="eyebrow">LEARNING DASHBOARD</p><h1>Course ratings</h1>
  <p className="subtitle">Choose a student to review the courses they've rated.</p>
  <section className="panel"><label htmlFor="student">Select student</label>
   {loadingStudents ? <p>Loading students…</p> : <select id="student" value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
    {students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}
   </select>}{error && <p className="error">{error}</p>}
  </section>
  <section className="panel"><h2>Rated courses</h2>
   {loadingRatings ? <p className="muted">Loading ratings…</p> : ratings.length ? <ul className="ratings">
    {ratings.map((rating) => <li key={rating.rating_id}><strong>{rating.course_title}</strong> — {rating.instructor}<br />Rating: {rating.rating}/5{rating.review && <><br />{rating.review}</>}</li>)}
   </ul> : <p className="muted">No rated courses for this student.</p>}
  </section>
 </main>;
}
