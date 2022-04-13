const mongoose = require("mongoose");
const vehicleModel = require("../Models/vehicleModel");

const Vehicle = mongoose.model("vehicle", vehicleModel);

module.exports = {
    async newVehicle(req, res) {
        try {
            const { manufacturer, model, licensePlate, price, features } = req.body;
            const vehicle = new Vehicle({ manufacturer, model, licensePlate, price, features });
            if (!(await vehicle.save()))
                return res.status(400).json({ msg: "Não foi possível inserir um novo veículo" });
            return res.json({ msg: "Veículo incluído com sucesso" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor" });
        }
    },

    async findAllVehicles(req, res) {
        try {
            const VehicleList = await Vehicle.find();
            if (!VehicleList || VehicleList.length == 0)
                return res.status(404).json({ msg: "Não há veículos cadastrados." });
            else return res.json({ msg: "Lista de veículos cadastrados.", VehicleList });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async deleteVehicle(req, res) {
        try {
            const _id = req.params.id;
            const DeletedVehicle = await Vehicle.findByIdAndDelete(_id);
            if (!DeletedVehicle || DeletedVehicle.length == 0)
                return res.status(404).json({ msg: "Veículo não encontrado." });
            else return res.json({ msg: "Veículo excluído." });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async updateVehicle(req, res) {
        try {
            const _id = req.params.id;
            const { manufacturer, model, licensePlate, price, features } = req.body;
            const UpdatedVehicle = await Vehicle.findByIdAndUpdate(
                _id,
                {
                    manufacturer,
                    model,
                    licensePlate,
                    price,
                    features
                },
                { new: true }
            );
            if (!UpdatedVehicle || UpdatedVehicle.length == 0)
                return res.status(404).json({ msg: "Veículo não encontrado." });
            else return res.json({ msg: "Veículo atualizado.", UpdatedVehicle });
        } catch (error) {
            console.log( error );
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async findInStockVehicles(req, res) {
        try {
            const VehicleList = await Vehicle.find({
                sold: false,
            });
            if (!VehicleList || VehicleList.length == 0)
                return res.status(404).json({ msg: "Não há veículos em estoque." });
            else return res.json({ msg: "Lista de veículos em estoque.", VehicleList });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

    async findSoldVehicles(req, res) {
        try {
            const VehicleList = await Vehicle.find({
                sold: true,
            });
            if (!VehicleList || VehicleList.length == 0)
                return res.status(404).json({ msg: "Não há veículos vendidos." });
            else return res.json({ msg: "Lista de veículos vendidos.", VehicleList });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },


};
