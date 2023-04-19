const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");

app.use(express.json());
app.use(express.static(__dirname + "/static"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static"));
});

db.connectDb()
  .then((activeUser) => {
    app.listen(3000, () => console.log("Listening on port 3000", activeUser));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
