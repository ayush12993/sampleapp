const express = require("express");
const connectDB = require("./db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const forgotPasswordRouter = require("./routes/forgotPassword.js");

const app = express();
const PORT = process.env.PORT || 8000;

// frontend connect to the backend
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use("/auth", authRoutes);

// Define user routes
app.use("/user", userRoutes);

// app.use("/api/forgotPassword", forgotPasswordRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
