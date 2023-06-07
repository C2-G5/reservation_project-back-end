const express = require("express");
const router = express.Router();
const pool = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authorization");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.json(users.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { name, email, phone, gender } = req.body;
    const update = await pool.query(
      "UPDATE users SET user_name=$1,user_email=$2,user_phone=$3,user_gender=$4 WHERE user_id=$5",
      [name, email, phone, gender, user]
    );
    res.json("user WAS UPDATING ");
  } catch (error) {
    console.error(error);
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
    res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
