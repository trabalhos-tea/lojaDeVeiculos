const mongoose = require("mongoose");

const saleModel = new mongoose.Schema({
    vehicleId: { type: String, required: true },
    salePrice: { type: Number, required: true },
    saleDate: { type: Date, required: true },
});

module.exports = saleModel;
