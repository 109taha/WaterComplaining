const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors
app.use(
  cors({
    origin: "*",
  })
);

// connect mongodb
const connectToMongoDB = require("./config/connectMongdb");
connectToMongoDB();

// Port
PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

const UserRouter = require("./router/user");
const ComplaintRouter = require("./router/complaint");
const VisitsDaily = require("./router/Visits");

//router
app.use("/auth", UserRouter);
app.use("/v1", ComplaintRouter);
app.use("/visit", VisitsDaily);
