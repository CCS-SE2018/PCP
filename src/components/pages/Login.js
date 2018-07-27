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
            fName : '',
            lName : '',
            login_username : '',
            signin_username : '',
            login_password : '',
            signin_password : '',
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
            case 'login_username' : this.setState({ login_username : event.target.value}); break;
            case 'login_password' : this.setState({ login_password : event.target.value}); break;
            case 'signin_username' : this.setState({ signin_username : event.target.value}); break;
            case 'signin_password' : this.setState({ signin_password : event.target.value}); break;
            case 'fName' : this.setState({ fName : event.target.value}); break;
            case 'lName' : this.setState({ lName : event.target.value}); break;
            default : console.log("this wasn't supposed to happen."); break;
        }
        console.log(event.target);
    }

    login(){
        console.log("button pressed!");
        const credentials = { username : this.state.login_username , password : this.state.login_password };
        console.log(credentials);
    }

    signup(){
        console.log("signup button pressed!");
        const credentials = { 
            firstName : this.state.fName,
            lastName : this.state.lName,
            username : this.state.signin_username,
            password : this.state.signin_password,
        }
        console.log(credentials);
    }
    render() {
        return (
        <div>
            <div class="container">
                <Column>
                    <Row>
                        <Card>
                        <div style={{width : 750}}>
                        <CardContent>
                            <Row vertical='center' horizontal="space-around" flexGrow={1} >
                                <Column>
                                    <Column flexGrow={.85}>
                                        <TextField
                                            id="login_username"
                                            label="User Name"
                                            value={this.state.login_username}
                                            onChange={this.onChange.bind(this)}
                                            margin="normal"
                                        />
                                    </Column>
                                </Column>
                                <Column>
                                    <Column flexGrow={.85}>
                                        <TextField
                                            id="login_password"
                                            label="Password"
                                            value={this.state.login_password}
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

                    <Row horizontal='around' flexGrow={1}>
                        <Column flexGrow={.5}>
                            <div>
                                
                            </div>
                        </Column>
                        
                        <Column flexGrow={.5} horizontal='center'>
                            <Row>   
                            <div>
                            <Card>
                                <CardContent>
                                        <Row flexGrow={1}>
                                            <h1>Sign Up</h1>
                                        </Row>
                                        <Row flexGrow={1}>
                                            <div>
                                                <TextField
                                                    id="fName"
                                                    label="First Name"
                                                    value={this.state.fName}
                                                    onChange={this.onChange.bind(this)}
                                                    margin="normal"
                                                />
                                            </div>
                                        </Row>
                                        <Row flexGrow={1}>
                                            <div>
                                                <TextField
                                                    id="lName"
                                                    label="Last Name"
                                                    value={this.state.lName}
                                                    onChange={this.onChange.bind(this)}
                                                    margin="normal"
                                                />
                                            </div>
                                        </Row>
                                        <Row flexGrow={1}>
                                        <div>
                                        <TextField
                                            id="signin_username"
                                            label="User Name"
                                            value={this.state.signin_username}
                                            onChange={this.onChange.bind(this)}
                                            margin="normal"
                                        />
                                        </div>
                                        </Row>
                                        <Row flexGrow={1}>
                                        <TextField
                                            id="signin_password"
                                            label="Password"
                                            value={this.state.signin_password}
                                            onChange={this.onChange.bind(this)}
                                            margin="normal"
                                            type="password"
                                        />
                                        </Row>
                                        <Button variant="contained" onClick={this.signup.bind(this)}>Signup</Button>
                                </CardContent>
                            </Card>
                            </div>
                            </Row>
                        </Column>
                    </Row>
                </Column>

            </div>
        </div>
        );
    }
}

export default Login;
