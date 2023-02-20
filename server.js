const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = express();
const server = http.createServer(app);

app.use(cors());


// connecting to the database
require("./config/db");
server.listen(process.env.PORT, () => {
    console.log(`your application is running on ${process.env.PORT}`);
  });