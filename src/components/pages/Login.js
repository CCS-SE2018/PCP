import React, { Component } from "react";
//import '../../../node_modules/materialize-css/dist/css/materialize.css';

import { Column, Row } from "simple-flexbox";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { Redirect, Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      login_username: "",
      signin_username: "",
      login_password: "",
      signin_password: "",
      adminRoute: "",
      willAuth: false,
      nextID: -1
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
    this.getMaxID();
  }

  getMaxID() {
    console.log("getMaxID");
    fetch("http://localhost:4000/users/getCount")
      .then(response => response.json())
      .then(json => this.setState({ nextID: json.data[0].count + 1 }));
    //depending on the console.log,
    //update state.lastUserID by adding the result of getCount by 1
  }

  onChange(event) {
    switch (event.target.id) {
      case "login_username":
        this.setState({ login_username: event.target.value });
        break;
      case "login_password":
        this.setState({ login_password: event.target.value });
        break;
      case "signin_username":
        this.setState({ signin_username: event.target.value });
        break;
      case "signin_password":
        this.setState({ signin_password: event.target.value });
        break;
      case "fName":
        this.setState({ fName: event.target.value });
        break;
      case "lName":
        this.setState({ lName: event.target.value });
        break;
      default:
        console.log("this wasn't supposed to happen.");
        break;
    }
    this.setState({ willAuth: true });
    console.log(event.target);
  }

  auth() {
    console.log("auth");
    const credentials = {
      username: this.state.login_username,
      password: this.state.login_password
    };
    if (this.state.willAuth) {
      if (credentials.username === "admin") {
        console.log("---admin---");
        this.setState({
          adminRoute: "/admin/home"
        });
      } else {
        console.log("---not admin---");
        this.setState({
          adminRoute: ""
        });
      }
      this.setState({ willAuth: false });
    }
    console.log(credentials);
  }

  login() {
    console.log("button pressed!");
    const credentials = {
      username: this.state.login_username,
      password: this.state.login_password
    };
    if (credentials.username === "admin") {
      console.log("admin");
    } else {
      console.log("not admin");
      console.log("getUser");
      fetch("http://localhost:4000/users/getUser")
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.setState({ users: response.data });
          this.getMaxID();
        })
        .catch(err => console.error(err));
    }
    console.log(credentials);
  }

  signup() {
    console.log("signup button pressed!");
    const credentials = {
      fName: this.state.fName,
      lName: this.state.lName,
      username: this.state.signin_username,
      password: this.state.signin_password
    };
    //this.addUser(credentials);
    const userID = this.state.nextID;
    console.log(userID);
    console.log(credentials);
    fetch(`http://localhost:4000/users/add?userID=${userID}&userName=${
      credentials.username
    }&
          userPassword=${credentials.password}&firstName=${
      credentials.fName
    }&lastName=${credentials.lName} `)
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => console.error(err));
    this.getMaxID();
  }

  addUser = credentials => {
    console.log("addUser");
    const fName = credentials.firstName;
    const lName = credentials.lastName;
    const username = credentials.username;
    const password = credentials.password;
    const uID = this.state.lastUserID;
    fetch(`http://localhost:4000/users/add?userID=${uID}&userName=${username}&
            userPassword=${password}&lastName=${lName}&firstName=${fName}`)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <div class="container">
          <Column>
            <Row horizontal="start">
              <Card>
                <div style={{ width: 750 }}>
                  <CardContent>
                    <Row
                      vertical="center"
                      horizontal="space-around"
                      flexGrow={1}
                    >
                      <Column>
                        <Column flexGrow={0.85}>
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
                        <Column flexGrow={0.85}>
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
                      <Column flexGrow={0.15}>
                        <Link to={this.state.adminRoute}>
                          <Button
                            variant="contained"
                            onClick={this.login.bind(this)}
                            onPointerEnter={this.auth.bind(this)}
                          >
                            Login
                          </Button>
                        </Link>
                      </Column>
                    </Row>
                  </CardContent>
                </div>
              </Card>
            </Row>

            <Row horizontal="around" flexGrow={1}>
              <Column flexGrow={0.5}>
                <div />
              </Column>

              <Column flexGrow={0.5} horizontal="center">
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
                        <Button
                          variant="contained"
                          onClick={this.signup.bind(this)}
                        >
                          Signup
                        </Button>
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
