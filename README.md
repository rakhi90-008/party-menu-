# Party Menu Selection App

This is a small ReactJS app built to satisfy the CKTech frontend assignment requirements.
Features implemented:
- Category tabs (Starter, Main Course, Dessert, Sides)
- Dish listing (name, description, image placeholder, Add/Remove button)
- Search bar (filters within selected meal type, case-insensitive)
- Veg / Non-Veg toggle filters
- Per-category selected counts and total selected count
- Ingredient detail screen with mock ingredient quantities
- Functional components using React Hooks
- Navigation between list and ingredient screen using react-router-dom

## How to run
1. Extract the zip (if you downloaded the zip).
2. `npm install`
3. `npm start`

## Project structure (important files)
- `src/App.js` - main app & routing
- `src/index.js` - render root
- `src/components/CategoryTabs.js`
- `src/components/DishList.js`
- `src/components/DishCard.js`
- `src/components/IngredientScreen.js`
- `src/mockData.json` - mock dishes and ingredients
- `README.md` - this file

Note: This project uses `react-router-dom` for navigation (web alternative to React Navigation).
