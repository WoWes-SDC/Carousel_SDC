const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "password",
  port: 5432
});
client.connect();


/****************** getAllData ******************/
client.query(`EXPLAIN ANALYZE SELECT * FROM items LIMIT 15;`, (err, data) => {
  console.log(data.rows.slice(-2));
  // ~0.05ms. Query is faster via the terminal
});
let randID = Math.ceil(Math.random() * 10000000);


/****************** getCategories ******************/
client.query(
  `EXPLAIN ANALYZE SELECT * FROM 
  (
  SELECT * FROM items 
  WHERE category = (SELECT category FROM items WHERE id = ${randID}) 
  LIMIT 100
  ) as a
  ORDER BY RANDOM()
  LIMIT 15;`,
  (err, data) => {
    console.log(data.rows.slice(-2));
    // ~2.00ms execution time
  }
);

/****************** getItem ******************/
client.query(
  `EXPLAIN ANALYZE SELECT * FROM items WHERE id = ${randID}`,
  (err, data) => {
    console.log(data.rows.slice(-2));
    // ~0.07ms execution time
  }
);
