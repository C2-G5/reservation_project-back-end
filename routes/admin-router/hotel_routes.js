const express = require("express");
const router = express.Router();
const pool = require("../../config/dbConfig");


router.get("/hotels", (req, res) => {
    pool.query("SELECT * FROM hotelinfo where is_deleted = false and is_accept = true", (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).send("Error executing query");
      } else {
        res.json(result.rows);
        
      }
    });
  });
  // show trash
router.get("/hotels/retrev", (req, res) => {
    pool.query("SELECT * FROM hotelinfo where is_deleted = true and is_accept = true", (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).send("Error executing query");
      } else {
        res.json(result.rows);
        
      }
    });
  });


  // soft delete hotel
  router.put("/hotels/deleted/:id", async function (req, res) {
    try {
      const { id } = req.params;
      const del = await pool.query(
       'UPDATE hotelinfo SET is_deleted = true WHERE hotel_id = $1',
        [id]
      );
      res.send("Deleted Successfully");
    } catch (err) {
      console.log(err.message);
    }
  });

  // retrev hotel
  router.put("/hotels/retrev/:id", async function (req, res) {
    try {
      const { id } = req.params;
      const del = await pool.query(
       'UPDATE hotelinfo SET is_deleted = false WHERE hotel_id = $1',
        [id]
      );
      res.send("retreved Successfully");
    } catch (err) {
      console.log(err.message);
    }
  });

  //  reject hotel
router.put("/hotels/request/reject/:id", async function (req, res) {
    try {
      const { id } = req.params;
      const del = await pool.query("delete from hotelinfo WHERE hotel_id = $1", [id]);
      res.send("Deleted Successfully");
    } catch (err) {
      console.log(err.message);
    }
  });

  router.get("/hotels/request", (req, res) => {
    pool.query("SELECT * FROM hotelinfo where is_accept = false", (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).send("Error executing query");
      } else {
        res.json(result.rows);
        console.log(result.rows);
      }
    });
  });
  
  // accepted hotel request
  router.put("/hotels/request/accept/:id", async function (req, res) {
    try {
      const { id } = req.params;
      const del = await pool.query(
        "UPDATE hotelinfo SET is_accept = true WHERE hotel_id = $1",
        [id]
      );
      res.send("Added Successfully");
    } catch (err) {
      console.log(err.message);
    }
  });

  module.exports = router;
