const express = require("express");
const app = express();
const router = require("./router.js");
const mongoose = require("mongoose");
const port = 3000;

try {
    mongoose.connect("mongodb+srv://leonardo951:vgb12vgb12@cluster0.bmovc.mongodb.net/vehicleShop?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (error) {
    console.log("Erro de conexão com MongoDB.");
}

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log("Server is running at localhost: ", port);
});

module.exports = app;
