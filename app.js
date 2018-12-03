var express = require("express");
var app = express();
var path = require("path");
app.use(express.static(path.resolve("build")));

app.listen(9891, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Listening at http://localhost:" + 9891 + "\n");
});
