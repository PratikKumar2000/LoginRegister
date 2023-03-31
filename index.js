require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//static files
app.use("/", express.static(path.join(__dirname, "Client", "build")));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
