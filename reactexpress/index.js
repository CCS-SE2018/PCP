const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

const SELECT_ALL_PRODUCT_QUERY = 'SELECT * FROM product';
const SELECT_ALL_SUPERMARKET_QUERY = 'SELECT * FROM supermarket';
const SELECT_ALL_USER_QUERY ='SELECT userID, userName, firstName, lastName FROM user';
const SELECT_ALL_FEEDBACK_QUERY = 'SELECT * FROM feedback';

const THE_SECRET = 'nakakapagpabagaBAG';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'price_check_program'
});

var pass;
// A function that hashes a password
function hashPassword(candidatePassword){
  const salt = 10;

  bcrypt.hash(candidatePassword, salt, function(err, hash) {
    if (err) {
      return console.log(err);
    }
    pass = hash;
  });
}

// //tests the hash function
// const pass = hashPassword('password');

connection.connect(err => {
  if (err) {
    return err;
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('type /products to see products');
});

//adds data to products
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

//adds data to users
app.get('/users/add', (req, res) => {
  const { userID, userName, userPassword, firstName, lastName } = req.query;
  console.log(req.query);
  
  const salt = 10;
  bcrypt.hash(userPassword, salt, function(err, hash) {
    if (err) {
      return console.log(err);
    }
    const INSERT_USERS_QUERY = `INSERT INTO user (userID, userName, userPassword, firstName, lastName)
    VALUES (${userID},'${userName}', '${hash}', '${firstName}', '${lastName}')`;
    connection.query(INSERT_USERS_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(results);
      }
    });
  });
});

//auth for user
app.get('/users/auth', (req, res) => {
  const { userName, userPassword } = req.query;

  const GET_USERS_QUERY = `SELECT userID, userName, userPassword, isAdmin, firstName, lastName FROM user
  WHERE userName = '${userName}'`;
  connection.query(GET_USERS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } 
    try{
      bcrypt.compare(userPassword, results[0].userPassword, function(err, isCorrect) {
        if (err) {
          return res.send(err);
        }
        return res.json({
          auth : isCorrect,
          admin : results[0].isAdmin,
          user : {
            firstName : results[0].firstName,
            lastName : results[0].lastName,
            userName : results[0].userName,
          }
        });
      });
    }catch(e){
      return res.json({
        auth : false,
        admin : false,
        message: 'an error occurred!',
        error : e
      });
    }
  });
});
//adds data to supermarket
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

// gets all products in the database
const productQuery = 'SELECT productID, productName, productPrice, productAvailability, s.supermarketName FROM product p INNER JOIN supermarket s WHERE p.supermarketID = s.supermarketID';
app.get('/products', (req, res) => {
  connection.query(productQuery, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// gets all products with the same name in the database
app.get('/products/getProduct', (req, res) => {
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

//gets the username and password
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

// gets all users in the database
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
  connection.query('SELECT f.feedbackID, f.productName, usr.firstName FROM feedback f INNER JOIN user usr WHERE f.userID = usr.userID', (err, results) => {
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
  console.log("PCP server listening on port 4000 ");
});
