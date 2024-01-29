const mongoose = require("mongoose");
const logger = require("./logger");

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("connected", () => {
  logger.info(`Connected to MongoDB`);
});

db.on("error", (err) => {
  logger.error(`Error in MongoDB connection: ${err}`);
});

db.on("disconnected", () => {
  logger.error("MongoDB disconnected");
});

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (err) {
    logger.error(`Error closing MongoDB connection: ${err}`);
    process.exit(1);
  }
});

module.exports = mongoose;
