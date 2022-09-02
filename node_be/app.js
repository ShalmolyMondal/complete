"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv/config");

// Import routes
const apiRoutes = require("./api");

const app = express();
const PORT = 9080;
const HOST = "127.0.0.1";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
// })

// Connect to DB
("mongodb://<db_user>:<password>@mongodb:27017/admin");

mongoose.connect(process.env.DB_CONNECTION_URI_IND, { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "CONNECTION ERROR"));
db.once("open", () => {
  // connected
  console.log("Connected to DB");
});

app.use(apiRoutes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
