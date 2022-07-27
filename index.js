const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productoRoute = require("./routes/productos");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use("/productos", productoRoute);

const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to mongo.");
  })
  .catch((error) => {
    console.log({ error });
  });

app.listen(3000);
