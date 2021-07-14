const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const mysql = require("mysql2/promise");
const { mysqlConfig } = require("../config");
const { loggedIn } = require("../middleware");

router.get("/", middleware.loggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [data] = await con.execute("SELECT * FROM teams");
    con.end();

    if (data.length === 0) {
      return res.send({ message: "No teams" });
    }

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Database error" });
  }
});

module.exports = router;
