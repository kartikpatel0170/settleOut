const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Connects to mongoDB
const path = require("path");

require("dotenv").config(); // Set ENV files from .env file
require("./config/db.js")

const app = express();
const port = process.env.PORT || 3000;

/* Middleware */
app.use(cors());
app.use(express.json()); // Parse JSON, because we send and recieve


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


/* Server Start */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});