const express = require("express");
const routes = express.Router();
const supplierRoute = require("./supplier.route");
const inventoryRoute = require("./inventory.route");

routes.use("/supplier", supplierRoute);
routes.use("/inventory", inventoryRoute);

module.exports = routes;
