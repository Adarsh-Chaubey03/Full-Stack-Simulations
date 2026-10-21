export async function fetchStudents() {
 const response = await fetch("/api/students");
 if (!response.ok) throw new Error(`Students request failed (${response.status})`);
 return response.json();
}

export async function fetchRatingsForStudent(studentId) {
 const response = await fetch(`/api/ratings/student/${studentId}`);
 if (!response.ok) throw new Error(`Ratings request failed (${response.status})`);
 return response.json();
}
