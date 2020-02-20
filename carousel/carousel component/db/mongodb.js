const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName = "myproject";
const client = new MongoClient(url);
let db;
let col;

client.connect(err => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db = client.db(dbName);
  col = db.collection("items");
});

const getAllData = callback => {
  col.find({ id: { $lt: 16 } }).toArray((err, data) => {
    if (err) {
      console.log("something went wrong in db trying to get all data");
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const getCategories = (id, callback) => {
  col
    .find({ id: parseInt(id) }, { category: 1, _id: 0 })
    .toArray((err, results) => {
      if (err) {
        console.log("error retrieving item");
        callback(err, null);
        return;
      }
      // console.log(results);
      col
        .find({ category: results[0].category })
        .limit(15)
        .skip(Math.random() * 15)
        .toArray((err, data) => {
          if (err) {
            console.log("Error finding items with the same category");
            callback(err, null);
          } else {
            callback(null, data);
          }
        });
    });
};

const getItem = (id, callback) => {
  col.find({ id: parseInt(id) }).toArray((err, data) => {
    if (err) {
      console.log("error getting item in db");
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports = { getAllData, getCategories, getItem };
