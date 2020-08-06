
const express = require("express");
const path = require("path");
const fs = require("fs");
// const OUTPUT_DIR = path.resolve(__dirname, "db");
// const outputPath = path.join(OUTPUT_DIR, "db.json");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//why no list of saved notes
//why no add to previously generated array in db
//app.delete?

// Api Routes
// =============================================================

// Displays all notes to api/notes
app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
   return res.json(data);
  });
});

// Create New Note - takes in JSON input
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
  let note = JSON.stringify(newNote, null, 2);
  fs.appendFile("./db/db.json", note, (err, data) => {
    if (err) throw err;
    // //returns new note to db.json
    consoleLOG(note);
    return res.json(note); 
  });
});

// app.delete("/api/notes/:id", function(req, res) {
//   const note = req.params.id;

//   console.log(note);

//   for (var i = 0; i < notes.length; i++) {
//     if (note === notes[i].routeName) {
//       return res.json(nodes[i]);
//     }
//   }

//   return res.json(false);
// });

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

function consoleLOG(data) {
  console.log(data);
}

