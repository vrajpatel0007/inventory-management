const Supplier = require("../models/supplier.model");

const addSupplier = async (supplier) => {
  return Supplier.create(supplier);
};

const findSupplierById = async (id) => {
  return Supplier.findById(id);
};

const findSupplierByName = async (name) => {
  return Supplier.findOne({ name });
};

module.exports = {
  addSupplier,
  findSupplierById,
  findSupplierByName
};
