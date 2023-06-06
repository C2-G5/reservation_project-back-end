const express = require("express");
const router = express.Router();
router.use(express.json());
const pool = require("../config/dbConfig");

router.get("/", async (req, res) => {
  try {
    const allPayments = await pool.query("SELECT * FROM paymentinfo");
    res.json(allPayments.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async function (req, res) {
  try {
    const user_id = req.body.user_id;
    const card_name = req.body.card_name;
    const card_number = req.body.card_number;
    const expiration_date = req.body.expiration_date;
    const security_code = req.body.security_code;
    console.log(card_name, card_number, expiration_date, security_code);
    const payments = await pool.query(
      "INSERT INTO paymentinfo (user_id, card_name, card_number, expiration_date, security_code) VALUES($1, $2, $3 , $4,$5) RETURNING *",
      [user_id, card_name, card_number, '2024-05-10', security_code]
    );
    res.json(payments.rows);
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
