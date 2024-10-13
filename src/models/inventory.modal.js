const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    lowStock: {
        type: Boolean,
        default: false
    },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory