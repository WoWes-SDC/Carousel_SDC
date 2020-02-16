const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName = "myproject";
const client = new MongoClient(url);

client.connect(err => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const col = db.collection("items");

  col
    .find({ id: { $lt: 16 } })
    .explain("executionStats")
    .then(result => {
      console.log(result);
      // ~4000ms with no index on id
      // 0ms with an index on id
    });

  let before = new Date();
  col
    .find({ id: 1 }, { category: 1, _id: 0 })
    .toArray((err, results) => {
      if (err) throw "Error finding item";
      // console.log(results[0].category);
      col
        .find({ category: results[0].category })
        .limit(15)
        .skip(Math.random() * 15)
        .toArray((err, data) => {
          if (err) throw "Error finding items with same category";
          console.log(new Date() - before);
          // approximately 11-13ms
          console.log(data);
        });
    });
    
  let randID = Math.ceil(Math.random() * 10000000);
  col
    .find({ id: randID })
    .explain("executionStats")
    .then(result => {
      console.log(result);
      // 0ms with an index on id
    });
});
