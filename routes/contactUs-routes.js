const express=require("express")
const router=express.Router()
const pool = require("../config/dbConfig");



// create post
router.post('/', async (req, res) => {
    try {
      const { subjectContact, emailContact, messagesContact } = req.body;

      // Save the data to the PostgreSQL database
      await pool.query('INSERT INTO contactmessages (subjectcontact, emailcontact, messagescontact) VALUES ($1, $2, $3)', [subjectContact, emailContact, messagesContact]);

      res.status(200).json({ message: 'Message saved successfully' });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //   show data
router.get('/', (req, res) => {
    const query = "SELECT * FROM contactmessages WHERE deleted = 1";

    pool.query(query, (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Something went wrong' });
      } else {
        res.json(result.rows);
      }
    });
  });
// //   update a card
router.put('/:id', async function(req, res){

    try{
        const { id } = req.params;

        console.log(id)

        const record = await pool.query("UPDATE contactmessages SET deleted = $1 WHERE id = $2",
        [0,id]);

        res.send(record);
    }
    catch(err){console.log(err.message);}
  });

  module.exports = router;