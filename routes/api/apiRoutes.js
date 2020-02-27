const router = require("express").Router();
const connection = require("../../db/connection");

// get all notes
router.get("/", function(req, res) {
  connection.query("SELECT * FROM notes", function(err, dbNotes) {
    res.json(dbNotes);
  });
});

// save a new note from req.body
router.post("/", function(req,res) {
  connection.query("INSERT INTO notes SET ?", [req.body], function(err, result){
    if (err) throw err;
    res.json(result);
  });
  console.log(req.body);
});



// delete a post based on parameters passed
router.delete ("/api/notes/:id", function (req, res) {
  connection.query(
    "DELETE FROM notes WHERE id = ?", [req.params.id], function(err, result){
      if (err) throw err;
      res.json(result);
    }
  );
});

module.exports = router;