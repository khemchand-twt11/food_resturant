const restaurant = require("../models/restaurant.model");

const Restaurants = async (req, res) => {
  try {
    const allRestaurants = await restaurant.find();
    res.status(200).json({ data: allRestaurants });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const RestaurantsById = async (req, res) => {
  const { id } = req.params;
  try {
    const allRestaurants = await restaurant.findOne({ _id: id });
    res.status(200).json({ data: allRestaurants });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const RestaurantMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await restaurant.findOne({ _id: id });
    res.status(200).json({ data: data.menu });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const UpdateMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await restaurant.updateOne(
      { _id: id },
      { $push: { menu: req.body } },
      { new: true }
    );
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const DeleteMenu = async (req, res) => {
  const { id, menuId } = req.params;
  try {
    const data = await restaurant.findOneAndUpdate(
      { _id: id },
      { $pull: { menu: { _id: menuId } } },
      { new: true }
    );
    res.status(200).json({ message: "menu deleted successfully", data: data });
  } catch (error) {}
};
module.exports = {
  Restaurants,
  RestaurantsById,
  RestaurantMenu,
  UpdateMenu,
  DeleteMenu,
};
