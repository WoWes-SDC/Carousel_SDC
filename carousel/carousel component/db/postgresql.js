const faker = require("faker");
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "password",
  port: 5432
});
client.connect();
client.query(
  `
DROP TABLE IF EXISTS items;
create table items (
  id serial primary key,
  image varchar(512),
  name text,
  rating int,
  category text
);`,
  (err, res) => {
    // console.log(err, res);
  }
);

function populateData() {
  for (let i = 0; i < 10000; i++) {
    let arr = [];
    for (let j = 0; j < 1000; j++) {
      let image = faker.image.cats();
      let name = faker.commerce.productName();
      let rating = faker.random.number({ min: 1, max: 5 });
      let category = faker.commerce.department();
      arr.push(`'${image}', '${name}', '${rating}', '${category}'`);
    }
    let values = "";
    for (let i = 0; i < 1000; i++) {
      values += `(${arr[i]}),`;
    }
    values = values.slice(0, values.length - 1);
    let query =
      "INSERT INTO items(image, name, rating, category) VALUES" + values;
    client
      .query(query)
      .then(res => {
        // console.log(res.rows[0]);
      })
      .catch(e => console.error(e.stack));
  }
}
populateData();
