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

app.get("/api/notes", function(req, res) {
  fs.readFile(outputPath, "utf8", (err, data) => {
    data = JSON.parse(data)
    if (err) throw err;
    console.log(data);
   return res.json(data);
  });
});

app.post("/api/notes", function(req, res) {
  fs.readFile(outputPath, "utf8", (err, data) => {
    if (err) throw err;
    const dbJson = JSON.parse(data);
    let newID = 0;
    if(dbJson !== [] || dbJson !== null || dbJson !== [{}]){
      newID = dbJson[dbJson.length-1].id + 1;
    }
    const newNote = {id: newID, ...req.body};
    dbJson.push(newNote);
    fs.writeFile(outputPath, JSON.stringify(dbJson, null, 2, +","), (err)=> {
      if (err) throw err;
      return res.json(newNote);
    })
  });
});

// app.delete("/api/notes/:id", function(req, res) {
//   fs.readFile(outputPath, "utf8", (err, data) => {
//     if (err) throw err;
//     const dbJson = JSON.parse(data);
//     let newID = 0;
//     if(dbJson !== [] || dbJson !== null || dbJson !== [{}]){
//       newID = dbJson[dbJson.length-1].id + 1;
//     }
//     const newNote = {id: newID, ...req.body};
//     dbJson.push(newNote);
//     fs.writeFile(outputPath, JSON.stringify(dbJson, null, 2, +","), (err)=> {
//       if (err) throw err;
//       return res.json(newNote);
//     })
//   });
// });

// htmlRoutes =============================================================
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Listening =============================================================
app.listen(PORT, function() {
  consoleLOG(`App listening on PORT: ${PORT}`);
});

function consoleLOG(data) {
  console.log(data);
}

