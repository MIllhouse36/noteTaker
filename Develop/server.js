
const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");
// const db = require(`./db/db.json`);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Api Routes
// =============================================================

// Displays all notes
app.get("/api/notes", function(req, res) {
  fs.readFile(outputPath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    return res.json();
  });
});

// Displays a single note, or returns false
// app.get("/api/notes/:note", function(req, res) {
//   let chosen = req.params.note;
  
//   console.log(chosen);
  
//   for (var i = 0; i < notes.length; i++) {
//     if (chosen === notes[i].routeName) {
//       return res.json(notes[i]);
//     }
//   }
  
//   return res.json(false);
// });

// Create New Note - takes in JSON input
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  fs.appendFile(outputPath, JSON.stringify(newNote)+",\n", (err, data) => {
    if (err) throw err;
  });
  console.log(newNote);
  // //returns new note to client
  res.json(newNote); 
});

// htmlRoutes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
