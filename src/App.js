import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/materialize-css/dist/css/materialize.css';

import HomePage from './components/pages/HomePage'

import {Button, Icon } from 'react-materialize';

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
