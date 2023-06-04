const express = require("express");
const router = express.Router();
const pool = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtTokens({ user_id, user_name, user_email, user_type }) {
  const user = { user_id, user_name, user_email, user_type };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

router.post("/login", async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;
    // email check
    const users = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    if (users.rows.length === 0) {
      return res.json({ error: "Email is incorrect" });
    }
    // password check
    const validpassword = await bcrypt.compare(
      password,
      users.rows[0].user_password
    );
    if (!validpassword) {
      return res.json({ error: "incorrect password" });
    }
    //JWT

    let tokens = jwtTokens(users.rows[0]);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/userType", (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (authHeader == 'Bearer null') return res.json({ error: "Null token" });
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  res.json(user);
});

module.exports = router;
