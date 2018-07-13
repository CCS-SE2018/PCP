import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/materialize-css/dist/css/materialize.css';

import {Button, Icon } from 'react-materialize';

class App extends Component {
  render() {
    return (
      <div>
        <Button>
          HELLO WORLD!
        </Button>
      </div>
    );
  }
}

export default App;
