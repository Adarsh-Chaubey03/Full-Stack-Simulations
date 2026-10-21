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

// Interview task: add the create-dish API helper after planning.
export async function addDish(dish) {
  const response = await api.post("/api/dishes", dish);
  return response.data;
}