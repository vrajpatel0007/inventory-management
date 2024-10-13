const inventory_service = require("../services/inventory.service");
const supplier_service = require("../services/supplier.service");
const csv = require("csv-parser");
const fs = require("fs");
const { Parser } = require("json2csv");


const addInventoryItem = async (req, res) => {
  const reqBody = req.body;
  try {
    if (!reqBody) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const supplier = await supplier_service.findSupplierById(reqBody.supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    const inventoryItem = {
      name: reqBody.name,
      quantity: reqBody.quantity,
      price: reqBody.price,
      supplier: reqBody.supplierId,
      lowStock: reqBody.quantity < 10
    };
    const newItem = await inventory_service.addItem(inventoryItem);
    return res.status(200).json({ message: "Item added successfully", newItem });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const exportInventory = async (req, res) => {
  try {
    const inventoryItems = await inventory_service.getAllItems();
    const fields = ["name", "quantity", "price", "lowStock", "supplier"];
    const parser = new Parser({ fields });
    const csvData = parser.parse(inventoryItems);
    res.attachment("inventory.csv").send(csvData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const importInventory = async (req, res) => {
  try {
    const filePath = req.file.path;
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        for (const item of results) {
          const supplier = await supplier_service.findSupplierByName(item.supplier);
          const inventoryItem = {
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            supplier: supplier ? supplier._id : null,
            lowStock: item.quantity < 10
          };
          await inventory_service.addItem(inventoryItem);
        }
        return res.status(200).json({ message: "Bulk import successful" });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateInventoryItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = await inventory_service.updateItem(itemId, req.body);
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Inventory item updated successfully", updatedItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteInventoryItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await inventory_service.deleteItem(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const checkLowStock = async (req, res) => {
  try {
    const lowStockItems = await inventory_service.getLowStockItems();
    return res.status(200).json(lowStockItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addInventoryItem,
  exportInventory,
  importInventory,
  updateInventoryItem,
  deleteInventoryItem,
  checkLowStock
};
