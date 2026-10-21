import { useEffect, useState } from "react";
import { fetchStudents } from "./api.js";
export default function App() {
 const [students, setStudents] = useState([]);
 const [selectedStudentId, setSelectedStudentId] = useState("");
 const [error, setError] = useState("");
 const [loadingStudents, setLoadingStudents] = useState(true);
 useEffect(() => {
  fetchStudents().then((data) => { setStudents(data); if (data.length) setSelectedStudentId(String(data[0].id)); })
   .catch((err) => setError(err.message)).finally(() => setLoadingStudents(false));
 }, []);
 return <main className="page">
  <p className="eyebrow">LEARNING DASHBOARD</p><h1>Course ratings</h1>
  <p className="subtitle">Choose a student to review the courses they've rated.</p>
  <section className="panel"><label htmlFor="student">Select student</label>
   {loadingStudents ? <p>Loading students…</p> : <select id="student" value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
    {students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}
   </select>}{error && <p className="error">{error}</p>}
  </section>
  {/* TODO: Fetch and display selected student's rated courses here. */}
  <section className="panel"><h2>Rated courses</h2><p className="muted">Complete the feature to show course title, instructor, rating, and review.</p></section>
 </main>;
}
