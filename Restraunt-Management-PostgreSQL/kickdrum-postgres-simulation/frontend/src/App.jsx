import { useEffect, useState } from "react";
import { fetchDishes,addDish } from "./api/dishes.js";

const categories = ["All", "Starter", "Main Course", "Dessert", "Beverage"];

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
const [dishCategory, setDishCategory] = useState("");
const [price, setPrice] = useState("");
const [adding, setAdding] = useState(false);
const [addError, setAddError] = useState("");
const [addSuccess, setAddSuccess] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetchDishes(search)
      .then((result) => { if (active) setDishes(result.data); })
      .catch(() => { if (active) setError("Could not load dishes. Check the API and database."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search]);

  const visibleDishes = category === "All" ? dishes : dishes.filter((dish) => dish.category === category);
const handleAddDish = async (event) => {
  event.preventDefault();
  setAdding(true);
  setAddError("");
  setAddSuccess("");

  try {
    const dish = await addDish({
      name: name.trim(),
      category: dishCategory.trim(),
      price: Number(price),
    });

    setDishes((prev) => [...prev, dish]);

    setName("");
    setDishCategory("");
    setPrice("");
    setAddSuccess("Dish added successfully.");
  } catch (err) {
    setAddError(err.message || "Failed to add dish.");
  } finally {
    setAdding(false);
  }
};
  return (
    <main className="page">
      <header className="topbar">
        <div className="brand-mark">R</div>
        <div><p className="eyebrow">RESTAURANT ADMIN</p><h1>Dish Manager</h1></div>
        <span className="status"><span /> PostgreSQL via API</span>
      </header>
      <section className="intro">
        <div><p className="eyebrow">MENU OPERATIONS</p><h2>Manage your menu</h2><p className="muted">Review dishes currently available in your restaurant.</p></div>
       
        {/* Interview task: add an “Add dish” action and form. */}
      <form onSubmit={handleAddDish}>
  <input
    type="text"
    placeholder="Dish name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />

  <input
    type="text"
    placeholder="Category"
    value={dishCategory}
    onChange={(e) => setDishCategory(e.target.value)}
    required
  />

  <input
    type="number"
    placeholder="Price"
    min="0"
    step="0.01"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    required
  />

  <button type="submit" disabled={adding}>
    {adding ? "Adding..." : "Add Dish"}
  </button>

  {addError && <p role="alert">{addError}</p>}
  {addSuccess && <p role="status">{addSuccess}</p>}
</form>
      </section>
      <section className="toolbar">
        <label className="search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dishes by name..." aria-label="Search dishes" /></label>
        <label className="category-select"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </section>
      <section className="list-heading"><div><h3>Menu items</h3><p className="muted">Dishes stored in PostgreSQL</p></div><span className="count">{visibleDishes.length} items</span></section>
      {loading && <div className="message">Loading menu...</div>}
      {!loading && error && <div className="message error">{error}</div>}
      {!loading && !error && visibleDishes.length === 0 && <div className="message">No dishes found. Try another search.</div>}
      {!loading && !error && visibleDishes.length > 0 && <section className="dish-grid">
        {visibleDishes.map((dish) => <article className="dish-card" key={dish.id}>
          <div className={`dish-art art-${dish.category.toLowerCase().replaceAll(" ", "-")}`}><span>{dish.category === "Dessert" ? "✳" : dish.category === "Beverage" ? "◉" : dish.category === "Starter" ? "✦" : "◈"}</span></div>
          <div className="dish-content"><div className="dish-title-row"><h4>{dish.name}</h4><strong>₹{dish.price}</strong></div><div className="dish-meta"><span>{dish.category}</span><span className={dish.available ? "available" : "unavailable"}>{dish.available ? "Available" : "Unavailable"}</span></div></div>
        </article>)}
      </section>}
      <footer>Restaurant Admin · PostgreSQL Full Stack Interview Practice</footer>
    </main>
  );
}
