const express = require("express");
const router = express.Router();
const pool = require("../../config/dbConfig");

// select all rooms from db
router.get("/rooms", (req, res) => {
    pool.query("SELECT * FROM roominfo", (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).send("Error executing query");
      } else {
        res.json(result.rows);
       
      }
    });
  });


  module.exports = router;
