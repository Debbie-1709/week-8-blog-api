require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");

const connectDB = require("./database/db.js");
const RequestLogger = require("./middlewares/logger.js");
const errorhandler = require("./middlewares/errorhandler.js");

const articleRoutes = require("./routes/article.routes.js");
const userRoutes = require("./routes/user.routes.js");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(RequestLogger);

// Routes
app.use("/api/article", articleRoutes);
app.use("/api/auth", userRoutes);

// Error handling middleware
app.use(errorhandler);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});