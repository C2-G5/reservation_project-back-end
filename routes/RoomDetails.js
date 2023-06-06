const express = require("express");
const router = express.Router();
const pool = require("../config/dbConfig");


//provider
router.get("/provider/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allRooms = await pool.query("SELECT * FROM roominfo WHERE hotel_id =$1",[id]);
    res.json(allRooms.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//users
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await pool.query("SELECT * FROM roominfo WHERE hotel_id =$1 AND is_available = true", [
      id,
    ]);
    res.json(room.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// payment
router.get("/payment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await pool.query("SELECT * FROM roominfo WHERE room_id =$1 AND is_available = true", [
      id,
    ]);
    res.json(room.rows);
  } catch (error) {
    console.error(error.message);
  }
});


router.get('/hotelrooms/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const Hotel=await pool.query("SELECT * FROM hotelInfo WHERE user_id =$1",[id])
    res.json(Hotel.rows)
  } catch (error) {
    console.error(error.message);
  }
})



router.post("/", async function (req, res) {
  try {
  const{room_type,number_of_room,price,number_of_beds,floor_area,descriptions,room_img,number_of_guests,hotel_id}=req.body
    const all_records = await pool.query(
      "INSERT INTO roominfo (room_type,number_of_room,price,number_of_beds,floor_area,descriptions,room_img,number_of_guests,hotel_id) VALUES($1, $2, $3 , $4,$5,$6,$7,$8,$9) RETURNING *",
      [room_type,number_of_room,price,number_of_beds,floor_area,descriptions,room_img,number_of_guests,hotel_id]
    );
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

///////////////////////update a hotels
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
  ///////////////////////update a hotels booking
router.put("/booking/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateRoom = await pool.query(
        "UPDATE roominfo SET is_available = false WHERE room_id = $1",[id],
      );
      res.json("room was UPDATING ");
    } catch (error) {
      console.error(error);
    }
  });
  ///////////////////////delete a hotels
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