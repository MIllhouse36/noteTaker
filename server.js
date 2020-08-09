const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//research spread operator!!
// Api Routes =============================================================

const apiroutes = require("./routes/apiroutes")
app.use(apiroutes);

// htmlRoutes =============================================================
 const htmlroutes = require("./routes/htmlroutes");
 app.use(htmlroutes);
// Listening =============================================================
app.listen(PORT, function () {
  consoleLOG(`App listening on PORT: ${PORT}`);
});

function consoleLOG(data) {
  console.log(data);
}

