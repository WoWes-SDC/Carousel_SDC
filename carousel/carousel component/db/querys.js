const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "wowescarousel.crg6wckxsyhk.us-east-2.rds.amazonaws.com",
  user: "rhodetyl000",
  password: "Nonewpassword",
  port: 3306,
  database: "Wowes"
});

connection.connect(err => {
  console.log("now connected to your database");
});

const getAllData = callback => {
  connection.query(`SELECT * FROM items LIMIT 15;`, (err, data) => {
    if (err) {
      console.log("something went wrong in db trying to get all data");
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const getCategories = (id, callback) => {
  connection.query(
    `SELECT * FROM 
    (
    SELECT * FROM items 
    WHERE category = (SELECT category FROM items WHERE id = ${id}) AND id != ${id}
    LIMIT 100
    ) as a
    ORDER BY RANDOM()
    LIMIT 15;`,
    (err, data) => {
      if (err) {
        console.log("something went wrong with getting categories in db");
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};
const getItem = (id, callback) => {
  connection.query(`SELECT * FROM items WHERE id = ${id}`, (err, data) => {
    if (err) {
      console.log("something went wrong with getting item in db");
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports = { getAllData, getCategories, getItem };
