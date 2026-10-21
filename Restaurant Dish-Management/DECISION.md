# Decisions — Add a New Dish

## Backend

- **Endpoint:** `POST /api/dishes`
- **Request body:**
  ```json
  {
    "name": "Paneer Tikka",
    "category": "Starter",
    "price": 220
  }
  ```
- **Validation rules:**
  - Name must be a non-empty string after trimming whitespace.
  - Category must be provided and match an allowed category.
  - Price must be a valid number greater than zero.
- **Duplicate handling:** Return `409 Conflict` if a dish with the same name already exists, ignoring case and leading/trailing spaces.
- **HTTP status codes:**
  - `201 Created` — dish created successfully.
  - `400 Bad Request` — invalid or missing input.
  - `409 Conflict` — duplicate dish.
  - `500 Internal Server Error` — unexpected server error.
- **Error handling:** Return a clear JSON message for each error. Do not expose internal error details to the client.
- **Files to change:**
  - `backend/src/routes/dishes.js`
  - `backend/src/controllers/dishesController.js`

## Frontend

- **Files to change:**
  - `frontend/src/api/dishes.js`
  - `frontend/src/App.jsx`
- **Form fields:** Name, Category, and Price.
- **Submit behavior:** Prevent the default form submission and send a POST request through the API helper.
- **Loading state:** Disable the submit button while the request is in progress to prevent repeated submissions.
- **Success state:** Show a success message and clear the form.
- **Error state:** Display the backend's validation or duplicate message. Handle network failures separately.
- **How the dish list updates:** Add the dish returned by the backend to React state after a successful response, without reloading the page.

## Database

- **Current storage:** In-memory JavaScript array in `backend/src/data/dishes.js`.
- **How a new dish is stored:** Validate the input, generate a unique ID, and append the new dish to the array.
- **Persistence limitations:** Data is lost when the backend restarts. Duplicate validation currently checks the existing in-memory data.
- **Future improvement:** Migrate to PostgreSQL when the interview practice reaches the database-upgrade stage.