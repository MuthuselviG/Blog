const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

dotenv.config();

app.use(express.json());

app.use("/images", cors(), express.static(path.join(__dirname, "/images")));


console.log(process.env.MONGO_URL)
mongoose
    .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true
    })
    .then(console.log("Mongo connected"))
    .catch((err) => console.log("Error connecting mongo"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", cors(), upload.single("file"), (req, res) => {
    
    res.status(200).json("File uploaded!");
});

app.use("/api/auth", cors(), authRoute);
app.use("/api/users", cors(), userRoute);
app.use("/api/posts", cors(), postRoute);
app.use("/api/categories", cors(), catRoute);

app.listen("5000", () => {
    console.log("Server running in 5000");
});