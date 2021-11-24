const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

dotenv.config();

app.use(express.json());
console.log(process.env.MONGO_URL)
mongoose
    .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true
    })
    .then(console.log("Mongo connected"))
    .catch((err) => console.log("Error connecting mongo"));

app.use("/api/auth", authRoute);

app.listen("5000", () => {
    console.log("Server running in 5000");
});