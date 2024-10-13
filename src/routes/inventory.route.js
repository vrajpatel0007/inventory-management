const express = require("express");
const inventory_controller = require("../controllers/inventory.controller");
const upload = require("../middleware/multer");

const router = express.Router();


router.post("/add", inventory_controller.addInventoryItem);
router.put("/update/:id", inventory_controller.updateInventoryItem);
router.delete("/delete/:id", inventory_controller.deleteInventoryItem);
router.get("/export", inventory_controller.exportInventory);
router.post("/import", upload.single("file"), inventory_controller.importInventory);
router.get("/low-stock", inventory_controller.checkLowStock);

module.exports = router;
