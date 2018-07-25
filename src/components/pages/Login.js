import React, { Component } from 'react';
//import '../../../node_modules/materialize-css/dist/css/materialize.css';

import { Column , Row } from 'simple-flexbox'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            userName : '',
            password : '',
        };
    }

    componentWillMount(){
        console.log("componentWillMount");
        this.getThings();
    }
    
    getThings(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => console.log(json));
    }

    onChange(event){
        switch(event.target.id){
            case 'name': this.setState({ userName : event.target.value}); break;
            case 'password' : this.setState({ password : event.target.value}); break;
            default : console.log("this wasn't supposed to happen."); break;
        }
        console.log(event.target);
    }

    login(){
        console.log("button pressed!");
        const credentials = { username : this.state.userName , password : this.state.password };
        console.log(credentials);
    }

    render() {
        return (
        <div>
            <div class="container">
                <h1>Login/Signup</h1>
                <Column>
                    <Row>
                        <Card>
                        <div style={{width : 750}}>
                        <CardContent>
                            <Row vertical='center' horizontal="space-around" flexGrow={1} >
                                <Column>
                                    <Column flexGrow={.85}>
                                        <TextField
                                            id="name"
                                            label="User Name"
                                            value={this.state.userName}
                                            onChange={this.onChange.bind(this)}
                                            margin="normal"
                                        />
                                    </Column>
                                </Column>
                                <Column>
                                    <Column flexGrow={.85}>
                                        <TextField
                                            id="password"
                                            label="Password"
                                            value={this.state.password}
                                            onChange={this.onChange.bind(this)}
                                            margin="normal"
                                            type="password"
                                        />
                                    </Column>
                                </Column>
                                <Column flexGrow={.15}>
                                    <Button variant="contained" onClick={this.login.bind(this)}>Login</Button>
                                </Column>
                            </Row>
                        </CardContent>
                        </div>
                        </Card>
                    </Row>
    
                    <Row>
                    </Row>
                </Column>
            
            </div>
        </div>
        );
    }
}

export default Login;
