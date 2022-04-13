const mongoose = require("mongoose");

const vehicleModel = new mongoose.Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    licensePlate: { type: String, required: true },
    price: { type: Number, required: true },
    features: [],
    sold: { type: Boolean, default: false },
});

module.exports = vehicleModel;
