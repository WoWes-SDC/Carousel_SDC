require("newrelic");
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
  // console.log("/wowstuff");
  // console.time("top15");
  db.getAllData((err, data) => {
    if (err) {
      console.log("problem getting all tasks in the server");
      res.send(err);
    } else {
      // console.log("the data is:", data.rows);
      res.send(data.rows); //postgres
      // res.send(data); //mongodb
      // console.timeEnd("top15");
    }
  });
});

app.get("/wowStuff/category", (req, res) => {
  // console.log("/wowstuff/category");
  // console.log("this is params --->", req.query);
  // console.time("category");
  db.getCategories(Math.ceil(Math.random() * 1000), (err, data) => {
    if (err) {
      console.log("problem getting categories in the server");
      res.send(err);
    } else {
      res.send(data.rows); //postgres
      // res.send(data); //mongodb
      // console.timeEnd("category");
    }
  });
});
app.get("/wowStuff/item", (req, res) => {
  // console.log("this is params --->", req.query);
  // console.log("/wowstuff/item");
  // console.time("item");
  db.getItem(4935234, (err, data) => {
    if (err) {
      console.log("problem getting categories in the server");
      res.send(err);
    } else {
      // console.log(data);
      res.send(data.rows); //postgres
      // res.send(data); //mongodb
      // console.timeEnd("item");
    }
  });
});

app.listen(port, () => {
  console.log(`yo, dude, listen-  you're connected to ${port}`);
});
