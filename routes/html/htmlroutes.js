const router = require("express").Router();
const path = require("path");

// index html at /
router
  .route("/")
  .get(function(req, res){
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// notes.html at /notes

router
  .route("/notes")
  .get(function(req, res){
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});


module.exports = router;