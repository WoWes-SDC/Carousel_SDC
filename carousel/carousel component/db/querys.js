// const { Client } = require("pg");

// const connection = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "test",
//   password: "password",
//   port: 5432
// });
// connection.connect();

const { Pool } = require("pg");
const connection = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "password",
  port: 5432,
  // max: 4,
  // idleTimeoutMillis: 3000,
  // connectionTimeoutMillis: 2000
});
connection.connect();

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
