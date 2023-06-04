const express = require("express");
const router = express.Router();
const pool = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authorization");

router.get("/", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    const userType = req.body.type;
    const hashedPwd = await bcrypt.hash(password, 10);
     // email check
    const users = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (users.rows.length !== 0) {
      return res.json({ error: "email already exists try another one" });
    }
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password ,user_type) VALUES($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPwd, userType]
    );
    res.json(true)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
