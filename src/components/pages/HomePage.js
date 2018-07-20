import React, { Component } from 'react';
import '../../../node_modules/materialize-css/dist/css/materialize.css';


import {Button} from 'react-materialize';

class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            text : '',
        };
    }

    handleClick(){
        console.log(this.state);
        alert("Hello " + this.state.text);
    }

    onChange(event){
        console.log("Change " + event.target.value);
        this.setState({
            text : event.target.value,
        });
    }

    render() {
        return (
        <div>
            <div class="container">
                <h3 style={{textAlign: 'center'}}>PRICE CHECKER PROGRAM</h3>
               
                <form class="col s6">
                    <label>
                        Product
                        <input type="text" name="name" onChange={this.onChange.bind(this)}/>
                    </label>
                    <div class="row" style={{textAlign: 'center'}}>
                    <Button waves='light' onClick={this.handleClick.bind(this)}>Search</Button>
                </div>
                </form>

                <p>Search string: {this.state.text}</p>
            </div>
        </div>
        );
    }
}

export default HomePage;
