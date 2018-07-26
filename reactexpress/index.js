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
