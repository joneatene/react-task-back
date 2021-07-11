const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello server");
});

app.all("*", (req, res) => {
  res.status(404).send("404 Page Not Found");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port} port`));
