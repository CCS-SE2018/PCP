import React, { Component } from 'react'
//import '../node_modules/materialize-css/dist/css/materialize.css';
import './App.css';
import HomePage from './components/pages/HomePage'
//TODO make this a router

class App extends Component {

  state ={
    products: [],
    product: {
      productName: 'sample product',
      productPrice: 20
    },
    nextID : '',
  }

componentDidMount() {
  this.getProducts();
}

// retreives the productName from table product
getProducts = _ => {
  console.log("getProducts");
  fetch('http://localhost:4000/products')
  .then(response => response.json())
  .then(response => {
    this.setState({ products: response.data})
    this.getMaxID();
  })
  .catch(err => console.error(err))
}

getMaxID(){
  var max = -1;       //gets -1 as a temporary max ID
  console.log(this.state.products);
  var products = this.state.products; //saves the products array into a variable
  var size = products.length; //saves the length of the products array into a variable
  for( var i=0 ; i < size ; i++){ // for loop to traverse the array
    var tempMax = products[i].productID;  //assigns the current productID to a variable (tempMax)
    if(tempMax>max){ //if tempMax is greater than the current max,
      max = tempMax;  //max is now the temp max
    }
  }

  max++;  //we increment max by 1 (to avoid conflicts in product IDs in the database)
  console.log(max);
  this.setState({ nextID : max });  //sets the state of nextID to the maximum (with the increment)
}

// Adds products to the database
addProduct = _ => {
    const  product  = this.state.product;
    const productID = this.state.nextID;
    console.log(product);
    fetch(`http://localhost:4000/products/add?productID=${productID}&productName=${product.productName}&productPrice=${product.productPrice} `)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err))
}

  renderProduct =({ productID, productName}) => <div key={productID}>{productName}</div>

  render() {
    const { products, product } = this.state;
    return (
      <div className="App">
        {products.map(this.renderProduct)}

        <div>
          <input
              value = {product.productName}
              onChange={e => this.setState({ product: { ...product, productName: e.target.value}})}
          />
          <input
              value = {product.productPrice}
              onChange={e => this.setState({ product: { ...product, productPrice: e.target.value}})}
          />
          <button onClick={this.addProduct}>Add product </button>
        </div>
      </div>
    );
  }
}

export default App;
