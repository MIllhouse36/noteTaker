const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "../db");
const outputPath = path.join(OUTPUT_DIR, "db.json");
const fs = require("fs");
const express = require("express");
const router = express.Router();

router.get("/api/notes", function (req, res) {
  fs.readFile(outputPath, "utf8", (err, data) => {
    if (err) throw err;
    // console.log(data);
    const dbJson = JSON.parse(data);
    // console.log(dbJson);
    return res.json(dbJson);
  });
});

router.post("/api/notes", function (req, res) {
    // console.log(req.body);
  fs.readFile(outputPath, "utf8", (err, data) => {
    if (err) throw err;
    const dbJson = JSON.parse(data);
    // console.log(dbJson);
    let newID;
    if (dbJson.length > 0) {
      newID = dbJson[dbJson.length - 1].id + 1;
      // console.log(newID)
    }else{
      newID = 1;
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

router.delete("/api/notes/:id", function(req, res) {
  const selectedNote = req.params.id;
  console.log(selectedNote);
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

module.exports = router;