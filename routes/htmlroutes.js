const path = require("path");
const express = require("express");
const router = express.Router();
// htmlRoutes =============================================================

router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;