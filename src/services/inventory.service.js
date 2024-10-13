const Inventory = require("../models/inventory.modal");

const addItem = async (item) => {
  return await Inventory.create(item);
};

const getAllItems = async () => {
  return await Inventory.find().populate("supplier");
};

const updateItem = async (id, data) => {
  return await Inventory.findByIdAndUpdate(id, data, { new: true });
};


const deleteItem = async (id) => {
  return await Inventory.findByIdAndDelete(id);
};

const getLowStockItems = async () => {
  return await Inventory.find({ lowStock: true });
};

module.exports = {
  addItem,
  getAllItems,
  updateItem,
  deleteItem,
  getLowStockItems
};
