import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/materialize-css/dist/css/materialize.css';

import Header from './components/Header.js'
import Body from './components/Body.js'

import {Button, Icon } from 'react-materialize';

//TODO make this a router

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
}

export default App;
