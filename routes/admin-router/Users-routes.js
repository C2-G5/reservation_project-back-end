const express = require("express");
const router = express.Router();
const pool = require("../../config/dbConfig");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();


// select all usere from db
router.get("/users", (req, res) => {
    pool.query('SELECT * FROM users where isdeleted = false', (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).send("Error executing query");
      } else {
        res.json(result.rows);
        
      }
    });
  });
// select all users deleted from db
router.get("/users/retreived", (req, res) => {
    pool.query('SELECT * FROM users where isdeleted = true', (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).send("Error executing query");
      } else {
        res.json(result.rows);
        
      }
    });
  });

  router.put("/users/:id", async function (req, res) {
    try {
      const { id } = req.params;
      const del = await pool.query(
        "UPDATE users SET isdeleted = true WHERE user_id = $1",
        [id]
      );
      res.send("Deleted Successfully");
    } catch (err) {
      console.log(err.message);
    }
  });
  router.put("/users/retreived/:id", async function (req, res) {
    try {
      const { id } = req.params;
      const del = await pool.query(
        "UPDATE users SET isdeleted = false WHERE user_id = $1",
        [id]
      );
      res.send("Deleted Successfully");
    } catch (err) {
      console.log(err.message);
    }
  });

  module.exports = router;
