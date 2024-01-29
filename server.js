const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const logger = require("./config/logger");
const { JWT } = require("./config/authConstant");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const server = http.createServer(app);

dotenv.config();
global.__basedir = __dirname;

// Middleware for all the requests
app.use(
  helmet({
    contentSecurityPolicy: false, // Set up separately if needed
    dnsPrefetchControl: { allow: true }, // Allow DNS prefetching
    frameguard: { action: "sameorigin" }, // Prevent clickjacking
    hidePoweredBy: true, // Don't advertise the server
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // 1 year
    ieNoOpen: true, // X-Download-Options for IE8+
    noSniff: true, // Prevent MIME based attacks
    xssFilter: true // Prevent reflected XSS attacks
  })
);
app.use(session({ secret: JWT.SECRET, saveUninitialized: true, resave: true }));
app.use(logRequests);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// Connecting to the database
require("./config/db");

// Routes
app.use(require("./routes/index"));

// Error handling middleware
app.use(logErrors);
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Your application is running on http://localhost:${PORT}`);
});

// Custom middleware to log incoming requests
function logRequests(req, res, next) {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
}

// Custom middleware to log errors
function logErrors(err, req, res, next) {
  logger.error(err.stack);
  next(err);
}
