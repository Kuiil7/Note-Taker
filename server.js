const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 8081;
const mainPath = path.join(__dirname, "/Develop/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainPath, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    let savedItems = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
   //changed [number, (req.params.id)]
    res.json(savedItems, req.params.id);
});

app.get("*", function(req, res) {
    res.sendFile(path.join(mainPath, "index.html"));
});

app.post("/api/notes", function(req, res) {
    let savedItems = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedItems.length).toString();
    newNote.id = uniqueID;
    savedItems.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedItems));
    //console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedItems);
})

app.delete("/api/notes/:id", function(req, res) {
    let savedItems = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    //console.log(`Deleting note with ID ${noteID}`);
    //using filter method to create new array
    savedItems = savedItems.filter(currNote => {
      //returns a new id that is not equal to the current note id
        return currNote.id != noteID;
    })
    //when current note is saved, the id equals a new id with string output
    for (currNote of savedItems) {
        currNote.id = newID.toString();
        //new ids to increment
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedItems));
    res.json(savedItems);
})

app.listen(port, function() {
    console.log(`Now listening to port ${port}.`);
})