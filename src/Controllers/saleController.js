const mongoose = require("mongoose");
const vehicleModel = require("../Models/vehicleModel");
const saleModel = require("../Models/saleModel");

const Vehicle = mongoose.model("vehicle", vehicleModel);
const Sale = mongoose.model("sale", saleModel);

module.exports = {
    async newSale(req, res) {
        try { 
            const { vehicleId, salePrice, saleDate } = req.body;
            const sale = new Sale({ vehicleId, salePrice, saleDate });
            const vehicleAlreadySold = await Sale.exists({
                vehicleId: vehicleId
            });

            if (vehicleAlreadySold)
                return res.status(409).json({ msg: "Não é possível concluir a venda pois o carro já foi vendido."});

            if (!(await sale.save()))
                return res.status(400).json({ msg: "Não foi possível registrar a venda." });
            
            await Vehicle.findByIdAndUpdate(
                vehicleId,
                {
                    sold: true
                },
                { new: true }
            );

            return res.json({ msg: "Venda registrada com sucesso", sale });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor" });
        }
    },

    async salesSummary(req, res) {
        try {
            const {startDate, endDate} = req.query;

            let salesSummary = await Sale.aggregate([
                {
                    $match: {
                        saleDate: {
                            $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                            $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        totalAmount: { $sum: "$salePrice"}
                    }
                }
              ]);

            if (!salesSummary || salesSummary.length == 0)
                return res.status(404).json({ msg: "Não foram encontradas vendas para esse período." });
            else return res.json({ msg: "Resumo de vendas listado com sucesso.", salesSummary });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro de processo no servidor." });
        }
    },

};
