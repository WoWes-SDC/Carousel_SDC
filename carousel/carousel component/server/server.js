const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 3005;
const app = express();
var cors = require("cors");
const db = require("../db/querys.js");

app.use(cors());
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/wowStuff", (req, res) => {
  console.log("batmans");
  db.getAllData((err, data) => {
    if (err) {
      console.log("problem getting all tasks in the server");
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
app.get("/wowStuff/category", (req, res) => {
  console.log("this is params --->", req.query);

  db.getCategories(req.query.id, (err, data) => {
    if (err) {
      console.log("problem getting categories in the server");
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
app.get("/wowStuff/item", (req, res) => {
  console.log("this is params --->", req.query);

  db.getItem(req.query.id, (err, data) => {
    if (err) {
      console.log("problem getting categories in the server");
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`yo, dude, listen-  you're connected to ${port}`);
});
