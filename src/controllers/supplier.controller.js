const supplier_service = require("../services/supplier.service");
// Add Supplier
const addSupplier = async (req, res) => {
  const reqBody = req.body;
  try {
    if (!reqBody) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const newSupplier = await supplier_service.addSupplier(reqBody);
    return res.status(200).json({ message: "Supplier added successfully", newSupplier });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addSupplier
};
