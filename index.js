const express = require("express");
const app = express();
const router = require("./router.js");
const mongoose = require("mongoose");

try {
    mongoose.connect(process.env.DB_SERVER, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (error) {
    console.log("Erro de conexão com MongoDB.");
}

app.use(express.json());
app.use(router);

app.listen(process.env.SYSTEM_PORT, () => {
    console.log("Server is running at localhost: ", process.env.SYSTEM_PORT);
});

module.exports = app;
