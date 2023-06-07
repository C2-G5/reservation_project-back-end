const express=require("express")
const router=express.Router()
const pool = require("../config/dbConfig");


// create post
router.post("/",async(req,res)=>{
    try{
  const {hotel_name,descriptions,city,phoneHotel,stars,imageHotel,user_id}=await req.body
  const newHotel= await pool.query(
    "INSERT INTO hotelInfo (hotel_name,descriptions,city,phoneHotel,stars,imageHotel,user_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",[hotel_name,descriptions,city,phoneHotel,stars,imageHotel,user_id]
  );
  res.json(newHotel.rows)
    }catch(err){
      console.log(err.message);
    }
  })




router.get('/', async(req, res) => {
    try {
      const allHotels=await pool.query("SELECT * FROM hotelInfo WHERE is_accept = true AND is_deleted = false")
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
      const {hotelName,descriptionh,city,phonNumber,rating,base64codeh}= req.body;
      const update=await pool.query(
        "UPDATE hotelinfo SET hotel_name=$1,descriptions=$2,city=$3,phonehotel=$4,stars=$5,imageHotel=$6 WHERE hotel_id=$7",
        [hotelName,descriptionh,city,phonNumber,rating,base64codeh,id]
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