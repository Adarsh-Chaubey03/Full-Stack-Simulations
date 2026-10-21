import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
});

export async function fetchDishes(search = "") {
  const response = await api.get("/api/dishes", {
    params: search ? { search } : {}
  });
  return response.data;
}

// Interview task: add addDish(dish) helper after planning.
export async function addDish(dish) {
  const res = await fetch("http://localhost:3000/api/dishes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dish),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add dish");
  }

  return data;
}