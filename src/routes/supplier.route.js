const express = require("express");
const supplier_controller = require("../controllers/supplier.controller");

const router = express.Router();


router.post("/add", supplier_controller.addSupplier);

module.exports = router;
