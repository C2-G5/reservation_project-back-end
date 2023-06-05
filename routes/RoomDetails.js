const express = require("express");
const router = express.Router();
const pool = require("../config/dbConfig");

router.get("/", async (req, res) => {
  try {
    const allRooms = await pool.query("SELECT * FROM roominfo");
    res.json(allRooms.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async function (req, res) {
  try {
  const{room_type,number_of_room,price,number_of_beds,floor_area,descriptions,room_img,number_of_guests}=req.body
    const all_records = await pool.query(
      "INSERT INTO roominfo (room_type,number_of_room,price,number_of_beds,floor_area,descriptions,room_img,number_of_guests,hotel_id) VALUES($1, $2, $3 , $4,$5,$6,$7,$8,$9) RETURNING *",
      [room_type,number_of_room,price,number_of_beds,floor_area,descriptions,room_img,number_of_guests]
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
      const {room_type,number_of_room,price,number_of_beds,floor_area,descriptions,room_img,number_of_guests} = req.body;
      const updateRoom = await pool.query(
        "UPDATE roominfo SET room_type=$1,number_of_room=$2,price=$3,number_of_beds=$4,floor_area=$5,descriptions=$6,room_img=$7,number_of_guests=$8 WHERE room_id=$9",
        [room_type,number_of_room,price,number_of_beds,floor_area,descriptions,room_img,number_of_guests,id]
      );
      res.json("hotels WAS UPDATING ");
    } catch (error) {
      console.error(error);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const {id} = req.params;
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