import React, { Component } from 'react';
//import '../node_modules/materialize-css/dist/css/materialize.css';

import HomePage from './components/pages/HomePage'

//TODO make this a router

class App extends Component {
  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

export default App;
