const express = require("express");
const {
  Restaurants,
  RestaurantsById,
  RestaurantMenu,
  UpdateMenu,
  DeleteMenu,
} = require("../controllers/resturant.controller");
const restaurant = require("../models/restaurant.model");

const restaurantRoute = express.Router();
restaurantRoute.get("/restaurants", Restaurants);
restaurantRoute.get("/restaurants/:id", RestaurantsById);
restaurantRoute.get("/restaurants/:id/menu", RestaurantMenu);
restaurantRoute.put("/restaurants/:id/menu", UpdateMenu);
restaurantRoute.delete("/restaurants/:id/menu/:menuId", DeleteMenu);
restaurantRoute.post("/register/add", async (req, res) => {
  const { id, name, address } = req.body;
  try {
    const data = new restaurant({ id, name, address });
    await data.save();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = restaurantRoute;
