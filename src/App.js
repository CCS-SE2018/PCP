import React, { Component } from 'react';
//import '../node_modules/materialize-css/dist/css/materialize.css';
import './App.css';
import HomePage from './components/pages/HomePage';
//TODO make this a router

class App extends Component {
  state = {
    user: {
      userName: '',
      userPassword: '',
      firstName: '',
      lastName: ''
    },
    nextID: '',
    users: [],
    products: [],
    product: {
      productName: '',
      productPrice: '',
    },
    response: [],

  };

  componentWillMount() {
    this.getUsers();
    this.getProducts();
    this.getProduct();
    console.log("componentWillMount");
  }

  componentDidMount() {
    this.getUsers();
    this.getProducts();
    this.getProduct();
    console.log("ComponentDidMount");
  }



  // retreives the productName from table product
  getUsers = _ => {
    console.log("getUsers");
    fetch('http://localhost:4000/users')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ users: response.data });
        this.getMaxID();
      })
      .catch(err => console.error(err));
  };

  getProducts =_=> {
    console.log("getProducts");
    fetch('http://localhost:4000/product/getProduct')
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setState({ products: response.data });
      this.getMaxID();
    })
    .catch(err =>console.error(err));
  };

  //for products
  getMaxID() {
    var max = -1; //gets -1 as a temporary max ID
    console.log(this.state.products);
    var products = this.state.products; //saves the products array into a variable
    var size = this.state.products.length; //saves the length of the products array into a variable
    for (var i = 0; i < size; i++) {
      // for loop to traverse the array
      var tempMax = this.state.products[i].productID; //assigns the current productID to a variable (tempMax)
      if (tempMax > max) {
        //if tempMax is greater than the current max,
        max = tempMax; //max is now the temp max
      }
    }
    max++; //we increment max by 1 (to avoid conflicts in product IDs in the database)
    console.log(max);
    this.setState({ nextID: max }); //sets the state of nextID to the maximum (with the increment)
  }

// for users
  getMaxID() {
    var max = -1; //gets -1 as a temporary max ID
    console.log(this.state.users);
    var users = this.state.users; //saves the products array into a variable
    var size = this.state.users.length; //saves the length of the products array into a variable
    for (var i = 0; i < size; i++) {
      // for loop to traverse the array
      var tempMax = this.state.users[i].userID; //assigns the current productID to a variable (tempMax)
      if (tempMax > max) {
        //if tempMax is greater than the current max,
        max = tempMax; //max is now the temp max
      }
    }
    max++; //we increment max by 1 (to avoid conflicts in product IDs in the database)
    console.log(max);
    this.setState({ nextID: max }); //sets the state of nextID to the maximum (with the increment)
  }
  /*
setProductAvailability(){
  var defaultValue = 1;
  this.setState({nextProductAvailability : defaultValue}); //sets the state of nextProductAvailability to the default value

*/

  /*
setSupermarketID(){
  var defaultValue = 1;
  this.setState({nextSupermarketID : defaultValue});  //sets the state of nextSupermarketID to the default value
}
*/

  // Adds users to the database
  addUser = _ => {
    const user = this.state.user;
    const userID = this.state.nextID;
    console.log(user);
    fetch(
      `http://localhost:4000/users/add?userID=${userID}&userName=${
        user.userName
      }&userPassword=${user.userPassword}&firstName=${
        user.firstName
      }&lastName=${user.lastName} `
    )
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  getProduct =_=> {
    const product = this.state.product;
    console.log(product);
    fetch(`http://localhost:4000/product/getProduct?productName=${product.productName} `)
    .then(response => response.json())
    .then(response => {
      console.log(response.data);
      this.setState({
        response: response.data,
      });
    })
    .catch(err => console.error(err));
  };

  /*
// Adds products to the database
addProduct = _ => {
    const  product  = this.state.product;
    const productID = this.state.nextID;
    const supermarketID = this.state.nextSupermarketID;
    const productAvailability = this.state.nextProductAvailability;
    console.log(product);
    fetch(`http://localhost:4000/products/add?productID=${productID}&productName=${product.productName}&productPrice=${product.productPrice}&productAvailability=${productAvailability}&supermarketID=${supermarketID} `)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err))
}

  renderUser =({ userID, userName}) => <div key={userID}>{userName}</div>
setProductAvailability(){
  var defaultValue = 1;
  this.setState({nextProductAvailability : defaultValue}); //sets the state of nextProductAvailability to the default value
}

setSupermarketID(){
  var defaultValue = 1;
  this.setState({nextSupermarketID : defaultValue});  //sets the state of nextSupermarketID to the default value
}

// Adds products to the database
addProduct = _ => {
  const  product  = this.state.product;
  const productID = this.state.nextID;
  const supermarketID = this.state.nextSupermarketID;
  const productAvailability = this.state.nextProductAvailability;
  console.log(product);
  fetch(`http://localhost:4000/products/add?productID=${productID}&productName=${product.productName}&productPrice=${product.productPrice}&productAvailability=${productAvailability}&supermarketID=${supermarketID} `)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err))
}
*/

  renderUser = ({ usersID, userName }) => <div key={usersID}>{userName}</div>;

  renderProduct = p => <div key = {p.productID}>{p.productName} {p.productPrice} php</div>;

  render() {
    const { users, user } = this.state;
    const {product, products, response} = this.state;
    return (
      <div className="App">
        {response.map(this.renderProduct)}
        <div>
          <br />
          <p> Product Name</p>
          <input
            value={product.productName}
            onChange={e =>
              this.setState({ product: { ...product, productName: e.target.value } })
            }
          />
          <br />
          <p>Password</p>
          <input
            value={user.userPassword}
            type="password"
            onChange={e =>
              this.setState({ user: { ...user, userPassword: e.target.value } })
            }
          />
          <br />
          <p>First Name </p>
          <input
            value={user.firstName}
            onChange={e =>
              this.setState({ user: { ...user, firstName: e.target.value } })
            }
          />
          <br />
          <p>Last Name </p>
          <input
            value={user.lastName}
            onChange={e =>
              this.setState({ user: { ...user, lastName: e.target.value } })
            }
          />
          <br />
          <button onClick={this.getProduct}>Register </button>
        </div>
      </div>
    );
  }
}

export default App;
