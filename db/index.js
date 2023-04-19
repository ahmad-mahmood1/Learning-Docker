const express = require("express");
const app = express();
const path = require("path");
const db = require("./client");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get((req, res) => {
  process.env.environment !== "production"
    ? res.sendFile(path.join(__dirname, "..", "index.html"))
    : res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.get("/api/activeUsers", db.getActiveUsers);

db.connectDb()
  .then(() => {
    app.listen(3000, () => console.log("Listening on port 3000"));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
