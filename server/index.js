const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
const userRouter = require("./Routes/users");
const adminRouter = require("./Routes/admin");
const mongoose = require("mongoose");

// Load environment variables
config();

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection started");
    // Start the server after successful DB connection
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit the process if DB connection fails
  });

// Routes
app.use("/users", userRouter);
app.use("/admin", adminRouter);

// Catch all route if no matching endpoint is found
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});
