const express = require("express");
const vehicleController = require("./src/Controllers/vehicleController");
const saleController = require("./src/Controllers/saleController");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("It's working!");
});

router.post("/addVehicle", vehicleController.newVehicle);
router.get("/findAllVehicles", vehicleController.findAllVehicles);
router.delete("/deleteVehicle/:id", vehicleController.deleteVehicle);
router.put("/updateVehicle/:id", vehicleController.updateVehicle);
router.get("/inStock", vehicleController.findInStockVehicles);
router.get("/soldVehicles", vehicleController.findSoldVehicles);

router.post("/sellVehicle", saleController.newSale);
router.get("/salesSummary", saleController.salesSummary);

module.exports = router;
