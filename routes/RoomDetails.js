const express = require("express");
const router = express.Router();
const pool = require("../config/dbConfig");

router.get("/", async (req, res) => {
  try {
    const allRooms = await pool.query("SELECT * FROM public.roominfo");
    res.json(allRooms.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async function (req, res) {
  try {
    const room_type = req.body.roomType;
    const number_of_room = req.body.roomNumber;
    const room_img = req.body.roomImage;
    const price = req.body.price;
    const all_records = await pool.query(
      "INSERT INTO roominfo (room_type, number_of_room, room_img, price ) VALUES($1, $2, $3 , $4) RETURNING *",
      [room_type, number_of_room, room_img, price]
    );
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await pool.query("SELECT * FROM roominfo WHERE room_id =$1", [
      id,
    ]);
    res.json(room.rows);
  } catch (error) {
    console.error(error.message);
  }
});


//update a hotels
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { room_type, number_of_room, price, room_img } = req.body;
      const updateRoom = await pool.query(
        "UPDATE roominfo SET room_type=$1,number_of_room=$2,price=$3,room_img=$4 WHERE room_id=$5",
        [room_type, number_of_room, price, room_img, id]
      );
      res.json("hotels WAS UPDATING ");
    } catch (error) {
      console.error(error);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteRoom = await pool.query(
        "DELETE FROM roominfo Where room_id=$1",
        [id]
      );
      res.json("hotel was deleted");
    } catch (error) {
      console.log(error.message);
    }
  });
module.exports = router;