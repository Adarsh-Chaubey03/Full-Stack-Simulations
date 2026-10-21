export async function fetchStudents() {
 const response = await fetch("/api/students");
 if (!response.ok) throw new Error(`Students request failed (${response.status})`);
 return response.json();
}
// TODO: Add fetchRatingsForStudent(studentId) for GET /api/ratings/student/:studentId.
