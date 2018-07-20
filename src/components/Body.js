import React, { Component } from 'react';
import '../../node_modules/materialize-css/dist/css/materialize.css';


class Body extends Component {
  constructor(props){
    super(props)
    this.state = {
      text : '',
    };
  }

  handleClick(){
    console.log(this.state);
  }

  onChange(event){
    console.log("Change " + event.target.value);
    this.setState({
      text : event.target.value,
    });
  }

  render() {
    return (
      <div class="container">
        <h3>Hello world</h3>
        <form>
          <label>
            Product
            <input type="text" name="name" onChange={this.onChange.bind(this)}/>
          </label>
          <input class="waves-effect white blue-text btn-small" type="submit" value="Submit" onClick={this.handleClick.bind(this)}/>
        </form>
	<p>Search string: {this.state.text}</p>
      </div>
    );
  }
}

export default Body;
