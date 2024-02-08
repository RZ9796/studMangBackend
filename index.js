const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: "./.env" });
//
mongoose.connect(process.env.MONGO_URL);
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "dist", "index.html")));
app.use(express.json());
// routes
app.use("/api/admin", require("./routes/adminRoute"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
  // res.status(404).json({ message: "Resource not found " });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Something went wrong " });
});

mongoose.connection.once("open", () => {
  console.log(process.env.PORT);
  console.log("mongo connected");
  app.listen(process.env.PORT, console.log("server running"));
});
