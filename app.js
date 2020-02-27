// requiring stuff
const express = require("express");
const routes = require("./routes/html");

//create express server
const app = express();
app.use(express.static('public'));

// sets pot for herouku or local 3000
const PORT = process.env.PORT || 3006;

// setting up express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static("public"));

// sets up api routes files
app.use(routes);

app.listen (PORT, function() {
  console.log("App listening on PORT: " + PORT);
});