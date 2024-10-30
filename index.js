const express = require("express");
const { MongoDb } = require("./helpers/DBConnection");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");
const appointmentRouter = require("./routes/appointmentRoutes");

const app = express();
app.use(express.json());

// Use routes
app.use("/api", categoryRouter);
app.use("/api", userRouter);
app.use("/api", appointmentRouter);

// Initialize MongoDB connection
MongoDb();

app.get("/", (req, res) => {
  res.send("Welcome to the Appointment Management System");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
