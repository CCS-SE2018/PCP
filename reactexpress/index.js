const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

const SELECT_ALL_PRODUCT_QUERY = 'SELECT * FROM product';
const SELECT_ALL_SUPERMARKET_QUERY = 'SELECT * FROM supermarket';
const SELECT_ALL_USER_QUERY ='SELECT * FROM user';
const SELECT_ALL_FEEDBACK_QUERY = 'SELECT * FROM feedback';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'price_check_program'
});

// A function that hashes a password
function hashPassword(candidatePassword){
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return console.log(err);
    }
    bcrypt.hash(candidatePassword, salt, function (err, hashedPassword) {
      if (err) {
        return console.log(err);
      }
      console.log(hashedPassword);
    });
  });
}

//tests the hash function
hashPassword('password');

connection.connect(err => {
  if (err) {
    return err;
  }
});

app.use(cors());

app.get(''/'', (req, res) => {
  res.send('type /products to see products');
});

//Adding a poduct to product table
app.get('/products/add', (req, res) => {
  const {
    productID,
    productName,
    productPrice,
    productAvailability,
    supermarketID
  } = req.query;
  const INSERT_PRODUCTS_QUERY = `INSERT INTO product (productID,productName, productPrice, productAvailability, supermarketID)
  VALUES (${productID},'${productName}', ${productPrice}, ${productAvailability}, ${supermarketID})`;
  console.log(INSERT_PRODUCTS_QUERY);
  connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send('successfully added product');
    }
  });
});

//Adding a user to user table
app.get('/users/add', (req, res) => {
  const { userID, userName, userPassword, firstName, lastName } = req.query;
  console.log(req.query);
  const INSERT_USERS_QUERY = `INSERT INTO user (userID, userName, userPassword, firstName, lastName)
  VALUES (${userID},'${userName}', '${userPassword}', '${firstName}', '${lastName}')`;
  console.log(INSERT_USERS_QUERY);
  connection.query(INSERT_USERS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send('successfully added user');
    }
  });
});

//adding supermarket to supermarket table
app.get('/supermarkets/add', (req, res) => {
  const { supermarketID, supermarketName, supermarketAddress } = req.query;
  const INSERT_SUPERMARKETS_QUERY = `INSERT INTO user (supermarketID, supermarketName, supermarketAddress)
  VALUES (${supermarketID},'${supermarketName}', '${supermarketAddress}')`;
  console.log(INSERT_SUPERMARKETS_QUERY);
  connection.query(INSERT_SUPERMARKETS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send('successfully added supermarket');
    }
  });
});



// gretrieves a single product from product table
app.get('/product/getProduct', (req, res) => {
  const SEARCH_A_PRODUCT_NAME = `SELECT productName FROM product WHERE productName ='Apple'`;
  connection.query(SEARCH_A_PRODUCT_NAME, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

//retrieves the username and password of a user
app.get('/users/getUser', (req, res) => {
  const { userName, userPassword } = req.query;
  console.log(req.query);
  const GET_USERS_QUERY = `Select userName, userPassword From user
  WHERE userName = '${userName}' AND userPassword =  '${userPassword}')`;
  console.log(INSERT_USERS_QUERY);
  connection.query(INSERT_USERS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send('successfully added user');
    }
  });
});



//gets the count of users from the database
app.get('/users/getCount', (req, res) => {
  connection.query("SELECT MAX(userID) AS count FROM user", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

//gets the count of supermarkets  from the database
app.get('/supermarkets/getCount', (req, res) => {
  connection.query("SELECT MAX(supermarketID) AS count FROM supermarket", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

//gets the count of products from the database
app.get('/users/getCount', (req, res) => {
  connection.query("SELECT MAX(productID) AS count FROM product", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

//gets the count of feedbacks from the database
app.get('/feedbacks/getCount', (req, res) => {
  connection.query("SELECT MAX(feedbackID) AS count FROM feedback", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// retrieves all the users in a database
app.get('/users', (req, res) => {
  connection.query(SELECT_ALL_USER_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// retrieves all products from product table
app.get('/products', (req, res) => {
  connection.query(SELECT_ALL_PRODUCT_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// gets all supermarkets in the database
app.get('/supermarkets', (req, res) => {
  connection.query(SELECT_ALL_SUPERMARKET_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      321;
      return res.json({
        data: results
      });
    }
  });
});

//gets all feedbacks in the database
app.get('/feedbacks', (req, res) => {
  connection.query(SELECT_ALL_FEEDBACK_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.listen(4000, () => {
  console.log("Products server listening on port 4000 ");
});
