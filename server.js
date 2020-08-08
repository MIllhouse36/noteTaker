const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//research spread operator!!
// Api Routes =============================================================

app.get("/api/notes", function (req, res) {
  fs.readFile(outputPath, "utf8", (err, data) => {
    if (err) throw err;
    const dbJson = JSON.parse(data);
    // console.log(dbJson);
    return res.json(dbJson);
  });
});

app.post("/api/notes", function (req, res) {
  fs.readFile(outputPath, "utf8", (err, data) => {
    if (err) throw err;
    const dbJson = JSON.parse(data);
    console.log(dbJson);
    console.log(dbJson === []);
    let newID;
    if (dbJson.length > 0) {
      newID = dbJson[dbJson.length - 1].id + 1;
      console.log(newID)
    }else{
      newID = 0;
    }
    let newNote = req.body;
    newNote.id = newID;
    // const newNote = { id: newID, ...req.body };
    dbJson.push(newNote);
    fs.writeFile(outputPath, JSON.stringify(dbJson, null, 2, +","), (err) => {
      if (err) throw err;
      return res.json(newNote);
    })
  });
});

app.delete("/api/notes/:id", function(req, res) {
  const selectedNote = req.params.id;
  console.log(selectedNote);
  // const chosen = JSON.parse(req.params.id); 
  //logs chosen number
  // console.log(chosen);
  fs.readFile(outputPath, "utf8", (err, data) => {
    if (err) throw err;
    let pData = JSON.parse(data);
      pData = pData.filter(function(pnotes){
        return pnotes.id != req.params.id;
      })

    fs.writeFile(outputPath, JSON.stringify(pData, null, 2, +","), (err)=> {
      if (err) throw err;
      res.json(selectedNote);
  });
      
  });
});

// htmlRoutes =============================================================
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Listening =============================================================
app.listen(PORT, function () {
  consoleLOG(`App listening on PORT: ${PORT}`);
});

function consoleLOG(data) {
  console.log(data);
}

