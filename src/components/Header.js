import React, { Component } from 'react';

import '../../node_modules/materialize-css/dist/css/materialize.css';


class Header extends Component {
  render() {
    return (
      <div style={divStyle.all} class="row">
        <div class="left-align">
          <div class="col s6">
            <a class="waves-effect waves-light btn-small" href="#">PCP</a>
            <a class="waves-effect waves-light btn-small" href="#">Home</a>
            <a class="waves-effect waves-light btn-small" href="#">About PCP</a>
          </div>
        </div>
        <div class="right-align">
          <div class="col s6" >
            <a class="waves-effect waves-light btn-small">Login / SignUp</a>
          </div>
        </div>
      </div>
    );
  }
}

const divStyle = {
  all : {
    height : 50,
    backgroundColor : '#000000',
    padding : 10,
  },
};
export default Header;
