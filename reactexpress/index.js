const express = require('express');
const cors = require ('cors');
const mysql = require('mysql');

const app = express ();

const SELECT_ALL_PRODUCT_QUERY = 'SELECT * FROM product';

const connection  =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'price_check_program'
});

connection.connect(err => {
  if(err) {
    return err;
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('go to /products to see products')
} );

app.get('/products/add', (req, res) => {
  const { productID, productName, productPrice, productAvailability, supermarketID } = req.query;
  //const INSERT_PRODUCTS_QUERY = `INSERT INTO product (productID, productName, productPrice, productAvailability, supermarketID) VALUES (${productID}), ('${productName}'), (${productPrice}), ('${productAvailability}'), (${supermarketID})`;
  const INSERT_PRODUCTS_QUERY = `INSERT INTO product (productID,productName, productPrice, productAvailability, supermarketID) VALUES (${productID},'${productName}', ${productPrice}, ${productAvailability}, ${supermarketID})`;
  console.log(INSERT_PRODUCTS_QUERY);
  connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.send('successfully added product')
    }
  });
});

app.get('/products', (req, res) => {
  connection.query(SELECT_ALL_PRODUCT_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.json({
        data: results
      })
    }
  });
});

app.listen(4000, () => {
  console.log('Products server listening on port 4000 ')
});
