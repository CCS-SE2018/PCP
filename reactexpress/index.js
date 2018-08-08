const express = require('express');
const cors = require ('cors');
const mysql = require('mysql');

const app = express ();

const SELECT_ALL_PRODUCT_QUERY = 'SELECT * FROM product';
const SELECT_ALL_SUPERMARKET_QUERY = 'SELECT * FROM supermarket';
const SELECT_ALL_USER_QUERY = 'SELECT * FROM user';
const SELECT_ALL_FEEDBACK_QUERY = 'SELECT * FROM feedback';



const connection  =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pcp'
});

connection.connect(err => {
  if(err) {
    return err;
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('type /products to see products')
} );

//adds data to products
app.get('/products/add', (req, res) => {
  const { productID, productName, productPrice, productAvailability, supermarketID } = req.query;
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

//adds data to users
app.get('/users/add', (req, res) => {
  const { userID, userName, userPassword, lastName, firstName } = req.query;
  const INSERT_USERS_QUERY = `INSERT INTO user (userID, userName, userPassword, lastName, firstName) VALUES (${userID},'${userName}', ${userPassword}, ${lastName}, ${firstName})`;
  console.log(INSERT_USERS_QUERY);
  connection.query(INSERT_USERS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.send('successfully added user')
    }
  });
});

//adds data to supermarket
app.get('/supermarkets/add', (req, res) => {
  const { supermarketID, supermarketName, supermarketAddress} = req.query;
  const INSERT_SUPERMARKETS_QUERY = `INSERT INTO user (supermarketID, supermarketName, supermarketAddress) VALUES (${supermarketID},'${supermarketName}', '${supermarketAddress}')`;
  console.log(INSERT_SUPERMARKETS_QUERY);
  connection.query(INSERT_SUPERMARKETS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.send('successfully added supermarket')
    }
  });
});

// gets all products in the database
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

// gets all products with the same name in the database
app.get('/product/Apple', (req, res) => {
  const SEARCH_A_PRODUCT_NAME = `SELECT * FROM product WHERE productName ='Apple'`
  connection.query(SEARCH_A_PRODUCT_NAME, (err, results) => {
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

// gets all users in the database
app.get('/users', (req, res) => {
  connection.query(SELECT_ALL_USER_QUERY, (err, results) => {
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

// gets all supermarkets in the database
app.get('/supermarkets', (req, res) => {
  connection.query(SELECT_ALL_SUPERMARKET_QUERY, (err, results) => {
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

//gets all feedbacks in the database
app.get('/feedbacks', (req, res) => {
  connection.query(SELECT_ALL_FEEDBACK_QUERY, (err, results) => {
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
