const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

const SELECT_ALL_SUPERMARKET_QUERY = 'SELECT * FROM supermarket';
const SELECT_ALL_USER_QUERY ='SELECT userID, userName, firstName, lastName FROM user';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'price_check_program'
});


function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

connection.connect(err => {
  if (err) {
    return err;
  }
  console.log('Connected!');
});

app.use(cors());

app.get('/', (req, res) => {
  return res.json({
    msg: 'success',
    res : 'hello there!'
  });
});

// ---------------------------------------------------------------------------
// ---------------------------------- ADDING ---------------------------------
// ---------------------------------------------------------------------------
//adds data to products
//TODO: change with the new attribute (matchID)
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
  connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//adding a user
app.get('/users/add', (req, res) => {
  const { userID, userName, userPassword, firstName, lastName } = req.query;
  
  const salt = 10;
  bcrypt.hash(userPassword, salt, function(err, hash) {
    if (err) {
      return res.json({
        msg: 'error in hashing',
        res : err
      });
    }
    const INSERT_USERS_QUERY = `INSERT INTO user (userID, userName, userPassword, firstName, lastName)
    VALUES (${userID},'${userName}', '${hash}', '${firstName}', '${lastName}')`;
    connection.query(INSERT_USERS_QUERY, (err, results) => {
      if (err) {
        return res.json({
          msg: 'error',
          res : err
        });
      } else {
        return res.json({
          msg: 'success',
          res: results
        });
      }
    });
  });
});

//adds data to supermarket
app.get('/supermarkets/add', (req, res) => {
  const { supermarketID, supermarketName, supermarketAddress } = req.query;
  const INSERT_SUPERMARKETS_QUERY = `INSERT INTO supermarket (supermarketID, supermarketName, supermarketAddress)
  VALUES (${supermarketID},'${supermarketName}', '${supermarketAddress}')`;
  connection.query(INSERT_SUPERMARKETS_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//adding feedback
app.get('/feedbacks/add', (req, res) => {
  const {feedbackID, userID, productName, productID } = req.query;
  const INSERT_FEEDBACKS_QUERY = `INSERT INTO feedback(feedbackID, userID, productName, productID)
  VALUES (${feedbackID}, ${userID}, '${productName}', ${productID})`;
  connection.query(INSERT_FEEDBACKS_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  })
})

// ---------------------------------------------------------------------------
// --------------------------------- UPDATE ----------------------------------
// ---------------------------------------------------------------------------
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
  connection.query(UPDATE_PRODUCTS_QUERY, (err, results) =>{
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//updates users
app.get('/users/update', (req, res) => {
  const { userID, userName, userPassword, firstName, lastName } = req.query;

  const salt = 10;
  bcrypt.hash(userPassword, salt, function(err, hash) {
    if(err) {
      return console.log(err);
    }
    const UPDATE_USERS_QUERY = `UPDATE user SET (userName, userPassword, firstName, lastName)
    VALUES ('${userName}', '${hash}', '${firstName}', '${lastName}') WHERE userID = ${userID}`;
    connection.query(UPDATE_USERS_QUERY, (err, results) => {
      if (err) {
        return res.json({
          msg: 'error',
          res : err
        });
      } else {
        return res.json({
          msg: 'success',
          res : results
        });
      }
    });
  });
});

//update supermarketAddress
app.get('/supermarkets/update', (req, res) => {
  const { supermarketID, supermarketName, supermarketAddress } = req.query;
  const UPDATE_SUPERMARKETS_QUERY = `UPDATE supermarket SET supermarketName = '${supermarketName}', supermarketAddress = '${supermarketAddress}' WHERE supermarketID = ${supermarketID}`
  connection.query(UPDATE_SUPERMARKETS_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

// ---------------------------------------------------------------------------
// ---------------------------------- DELETE ---------------------------------
// ---------------------------------------------------------------------------
//Query for DELETING specific data in a table
//delete user
app.get('/users/delete', (req, res) => {
  const { userID } = req.query;
  const DELETE_USERS_QUERY = `DELETE FROM user WHERE userID = ${userID}`;
  connection.query(DELETE_USERS_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//delete products
app.get('/products/delete', (req, res) => {
  const{productID} = req.query;
  const DELETE_PRODUCTS_QUERY = `DELETE FROM product WHERE productID = ${productID}`;
  connection.query(DELETE_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//delete supermarkets
app.get('/supermarkets/delete', (req, res) => {
  const{supermarketID} = req.query;
  const DELETE_SUPERMARKETS_QUERY = `DELETE FROM supermarket WHERE supermarketID = ${supermarketID}`;
  connection.query(DELETE_SUPERMARKETS_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//delete feedbacks
app.get('/feedbacks/delete', (req, res) => {
  const{feedbackID} = req.query;
  const DELETE_FEEDBACKS_QUERY = `DELETE FROM feedback WHERE feedbackID = ${feedbackID}`;
  connection.query(DELETE_FEEDBACKS_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

// ---------------------------------------------------------------------------
// --------------------------------- GETTERS ---------------------------------
// ---------------------------------------------------------------------------
//gets the count of users
app.get('/users/getCount', (req, res) => {
  connection.query("SELECT MAX(userID) AS count FROM user", (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//gets the count of supermarkets
app.get('/supermarkets/getCount', (req, res) => {
  connection.query("SELECT MAX(supermarketID) AS count FROM supermarket", (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//gets the count of products
app.get('/products/getCount', (req, res) => {
  connection.query("SELECT MAX(productID) AS count FROM product", (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//gets the count of feedbacks
app.get('/feedbacks/getCount', (req, res) => {
  connection.query("SELECT MAX(feedbackID) AS count FROM feedback", (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});


// ---------------------------------------------------------------------------
// --------------------------------- GET ALL ---------------------------------
// ---------------------------------------------------------------------------
// gets all products in the database
const productQuery = 'SELECT productID, productName, productPrice, productAvailability, s.supermarketName, productMatch FROM product p INNER JOIN supermarket s WHERE p.supermarketID = s.supermarketID AND productID != 0';
app.get('/products', (req, res) => {
  connection.query(productQuery, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

// gets all users in the database
app.get('/users', (req, res) => {
  connection.query(SELECT_ALL_USER_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

// gets all supermarkets in the database
app.get('/supermarkets', (req, res) => {
  connection.query(SELECT_ALL_SUPERMARKET_QUERY, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});

//gets all feedbacks in the database
app.get('/feedbacks', (req, res) => {
  connection.query('SELECT f.feedbackID, f.productName, usr.firstName FROM feedback f INNER JOIN user usr WHERE f.userID = usr.userID', (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg: 'success',
        res : results
      });
    }
  });
});





// ---------------------------------------------------------------------------
// ----------------------------------- MISC ----------------------------------
// ---------------------------------------------------------------------------

// retrieves matched products
app.get('/products/find', (req, res) => {
  const {productName} = req.query;
  const SEARCH_A_PRODUCT_NAME = `SELECT
    p.productID AS p_ID,
    p.productName AS p_name,
    p.productAvailability AS p_availability,
    p.productPrice AS p_price,
    p.supermarketID AS p_marketID,
    p.supermarketName AS p_market,
    p.productMatch AS p_matchID,
	  mtch.productID AS matched_ID,
    mtch.productName AS matched_name,
    mtch.productAvailability AS matched_availability,
    mtch.productPrice AS matched_price,
    mtch.supermarketID AS matched_marketID,
    mtch.supermarketName AS matched_market
    FROM
    (
    SELECT
    	productID,
    	productName,
        productAvailability,
        productPrice,
        product.supermarketID,
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
        product.supermarketID,
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
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg : 'success',
        res : results
      });
    }
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
            id : results[0].userID,
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

//checking for username uniqueness
app.get('/users/check', (req, res) => {
  const { userName } = req.query;

  const GET_USERS_QUERY = `SELECT userName FROM user
  WHERE userName = '${userName}'`;
  connection.query(GET_USERS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } 
    try{
      if(isEmpty(results)){
        return res.json({
            unique : true
        });
      }else{
        return res.json({
          unique: false
        })
      }
    }catch(e){
      return res.json({
        message: 'an error occurred!',
        error : e
      });
    }
  });
});

app.get('/products/getProducts', (req,res) =>{
  const {products} = req.query;
  var prod = JSON.parse(products);

  var query = `SELECT
    p.productID AS p_ID,
    p.productName AS p_name,
    p.productAvailability AS p_availability,
    p.productPrice AS p_price,
    p.supermarketID AS p_marketID,
    p.supermarketName AS p_market,
    p.productMatch AS p_matchID,
    mtch.productID AS matched_ID,
    mtch.productName AS matched_name,
    mtch.productAvailability AS matched_availability,
    mtch.productPrice AS matched_price,
    mtch.supermarketID AS matched_marketID,
    mtch.supermarketName AS matched_market
    FROM
    (
    SELECT
      productID,
      productName,
        productAvailability,
        productPrice,
        product.supermarketID,
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
        product.supermarketID,
        supermarketName,
        productMatch
    FROM price_check_program.product
    INNER JOIN price_check_program.supermarket
      ON product.supermarketID=supermarket.supermarketID
      WHERE product.supermarketID=supermarket.supermarketID)
        mtch
    WHERE p.productMatch=mtch.productID AND p.productID != 0 AND (`;

  prod.map((item)=>{
    query = query.concat(`p.productID = ${item} OR `);
  })
  query = query.concat("FALSE)");

  connection.query(query, (err, results) => {
    if (err) {
      return res.json({
        msg: 'error',
        res : err
      });
    } else {
      return res.json({
        msg : 'success',
        res : results
      });
    }
  });
});

app.listen(4000, () => {
  console.log("PCP server listening on port 4000 ");
});
