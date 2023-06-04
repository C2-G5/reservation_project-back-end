const express=require("express")
const router=express.Router()
const pool = require("../config/dbConfig");


// create post
router.post("/",async(req,res)=>{
    try{
  const {hotel_name,descriptions,city,adress,phoneHotel,stars,imageHotel}=await req.body
  const newHotel= pool.query(
    "INSERT INTO hotelInfo (hotel_name,descriptions,city,adress,phoneHotel,stars,imageHotel) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",[hotel_name,descriptions,city,adress,phoneHotel,stars,imageHotel]
  );
  res.json(newHotel)
    }catch(err){
      console.log(err.message);
    }
  })




router.get('/', async(req, res) => {
    try {
      const allHotels=await pool.query("SELECT * FROM hotelInfo")
      res.json(allHotels.rows)
    } catch (error) {
      console.error(error.message);
    }
  })

  
  router.get('/:id', async(req, res) => {
    try {
   
  const {id}=req.params;
  const hotel=await pool.query("SELECT * FROM hotelInfo WHERE hotel_id =$1",[id])
  res.json(hotel.rows)
  } catch (error) {
      console.error(error.message);
    }
  })


//   update a hotels
  router.put("/:id",async(req,res)=>{
    try {
      const {id}=req.params;
      const {hotel_name,descriptions,city,adress,phoneHotel,stars,imageHotel}=req.body;
      const updateToDo=await pool.query(
        "UPDATE hotelInfo SET hotel_name=$1,descriptions=$2,city=$3,adress=$4,phoneHotel=$5,stars=$6,imageHotel=$7 WHERE hotel_id=$8",
        [hotel_name,descriptions,city,adress,phoneHotel,stars,imageHotel,id]
      );
      res.json("hotels WAS UPDATING ")
    } catch (error) {
      console.error(error)
      
    }
  })


  // delete a hotels
  router.delete("/:id",async(req, res) => {
    try {
      const {id}=req.params;
      const deletehotel=await pool.query("DELETE FROM hotelInfo Where hotel_id=$1",[id]);
      res.json("hotel was deleted")
    } catch (error) {
      console.log(error.message)
    }
  })
  




module.exports = router