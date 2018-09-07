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

var pass;
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
//hashPassword('password');

connection.connect(err => {
  if (err) {
    return err;
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('type /products to see products');
});

//Query for ADDING data
//Adding a poduct
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

//Adding a user
app.get('/users/add', (req, res) => {
  const { userID, userName, userPassword, firstName, lastName } = req.query;
  console.log(req.query);

  const salt = 10;
  bcrypt.hash(userPassword, salt, function(err, hash) {
    if(err) {
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

  const GET_USERS_QUERY = `SELECT userID, userName, userPassword, isAdmin FROM user
  WHERE userName = '${userName}'`;
  connection.query(GET_USERS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    }
    try{
      console.log("userPassword: " + userPassword);
      console.log("results[0].userPassword: " + results[0].userPassword);
      bcrypt.compare(userPassword, results[0].userPassword, function(err, isCorrect) {
        if (err) {
          return res.send(err);
        }
        return res.json({
          auth : isCorrect,
          admin : results[0].isAdmin
        });
      });
    }catch(e){
      return res.send("something happened\n" + e);
    }
  });
});

//adding supermarket
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

//adding feedback
app.get('/feedbacks/add', (req, res) => {
  const {feedbackID, userID, productName, productID } = req.query;
  const INSER_FEEDBACKS_QUERY = `INSERT INTO feedback(feedbackID, userID, productName, productID)
  VALUES (${feedbackID}, ${userID}, '${productName}', ${productID})`;
  console.log(INSERT_FEEDBACKS_QUERY);
  connection.query(INSERT_FEEDBACKS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send('successfully added feedback');
    }
  })
})

//Query for UPDATING specific data in a table
//updates products
app.get('/products/update', (req, res) => {
  const {
    productID,
    productName,
    productPrice,
    productAvailability,
    supermarketID
  } = req.query;
  const UPDATE_PRODUCTS_QUERY = `UPDATE product SET (productName, productPrice, productAvailability, supermarketID)
  VALUES ('${productName}', ${productPrice}, ${productAvailability}, ${supermarketID}) WHERE productID = ${productID}`;
  console.log(UPDATE_PRODUCTS_QUERY);
  connection.query(UPDATE_PRODUCTS_QUERY, (err, results) =>{
    if(err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//updates users
app.get('/users/update', (req, res) => {
  const { userID, userName, userPassword, firstName, lastName } = req.query;
  console.log(req.query);

  const salt = 10;
  bcrypt.hash(userPassword, salt, function(err, hash) {
    if(err) {
      return console.log(err);
    }
    const UPDATE_USERS_QUERY = `UPDATE user SET (userName, userPassword, firstName, lastName)
    VALUES ('${userName}', '${hash}', '${firstName}', '${lastName}') WHERE userID = ${userID}`;
    connection.query(UPDATE_USERS_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send('successfully updated user');
      }
    });
  });
});

//update supermarketAddress
app.get('/supermarkets/update', (req, res) => {
  const { supermarketID, supermarketName, supermarketAddress } = req.query;
  const UPDATE_SUPERMARKETS_QUERY = `UPDATE supermarket (supermarketName, supermarketAddress)
  VALUES ('${supermarketName}', '${supermarketAddress}') WHERE supermarketID = ${supermarketID}`;
  console.log(UPDATE_SUPERMARKETS_QUERY);
  connection.query(UPDATE_SUPERMARKETS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//Query for DELETING specific data in a table
//delete user
app.get('/users/delete', (req, res) => {
  const { userID } = req.query;
  console.log(req.query);
  const DELETE_USERS_QUERY = `DELETE FROM user WHERE userID = ${userID}`;
  console.log(DELETE_USERS_QUERY);
  connection.query(DELETE_USERS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//delete products
app.get('/products/delete', (req, res) => {
  const{productID} = req.query;
  console.log(req.query);
  const DELETE_PRODUCTS_QUERY = `DELETE FROM product WHERE productID = ${productID}`;
  console.log(DELETE_PRODUCTS_QUERY);
  connection.query(DELETE_PRODUCTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//delete supermarkets
app.get('/supermarkets/delete', (req, res) => {
  const{supermarketID} = req.query;
  console.log(req.query);
  const DELETE_SUPERMARKETS_QUERY = `DELETE FROM supermarket WHERE supermarketID = ${supermarketID}`;
  console.log(DELETE_SUPERMARKETS_QUERY);
  connection.query(DELETE_SUPERMARKETS_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//delete feedbacks
app.get('/feedbacks/delete', (req, res) => {
  const{feedbackID} = req.query;
  console.log(req.query);
  const DELETE_FEEDBACKS_QUERY = `DELETE FROM feedback WHERE feedbackID = ${feedbackID}`;
  console.log(DELETE_FEEDBACKS_QUERY);
  connection.query(DELETE_FEEDBACKS_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

//Query for VIEWING specific data in a table
// retrieves matched products
app.get('/products/getProduct', (req, res) => {
  const {productName} = req.query;
  const SEARCH_A_PRODUCT_NAME = `SELECT
    p.productID AS p_ID,
    p.productName AS p_name,
    p.productAvailability AS p_availability,
    p.productPrice AS p_price,
    p.supermarketName AS p_market,
    p.productMatch AS p_matchID,
	   mtch.productID AS matched_ID,
    mtch.productName AS matched_name,
    mtch.productAvailability AS matched_availability,
    mtch.productPrice AS matched_price,
    mtch.supermarketName AS matched_market
    FROM
    (
    SELECT
    	productID,
    	productName,
        productAvailability,
        productPrice,
        supermarketName,
        productMatch
    FROM price_check_program.product
    INNER JOIN price_check_program.supermarket
    	ON product.supermarketID=supermarket.supermarketID
    	WHERE product.supermarketID=supermarket.supermarketID )
        p,
    (
    SELECT
    	productID,
    	productName,
        productAvailability,
        productPrice,
        supermarketName,
        productMatch
    FROM price_check_program.product
    INNER JOIN price_check_program.supermarket
    	ON product.supermarketID=supermarket.supermarketID
    	WHERE product.supermarketID=supermarket.supermarketID)
        mtch
    WHERE p.productMatch=mtch.productID AND p.productID != 0 AND p.productName LIKE '%${productName}%'`;
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

//retrieves the username and password
app.get('/users/getUser', (req, res) => {
  const { userName, userPassword } = req.query;
  console.log(req.query);
  const GET_USERS_QUERY = `SELECT userName, userPassword FROM user
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

//gets the count of users
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

//gets the count of supermarkets
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

//gets the count of products
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

//gets the count of feedbacks
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

//Query for retrieving an entire table
// retrieves all the users
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

// gets all products in the database
const productQuery = 'SELECT productID, productName, productPrice, productAvailability, s.supermarketName, productMatch FROM product p INNER JOIN supermarket s WHERE p.supermarketID = s.supermarketID';
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

// gets all supermarkets
app.get('/supermarkets', (req, res) => {
  connection.query(SELECT_ALL_SUPERMARKET_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

//gets all feedbacks
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
  console.log("Products server listening on port 4000 ");
});
