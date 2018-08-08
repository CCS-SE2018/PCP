import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import HomePage from './components/pages/HomePage'
import AboutPage from './components/pages/About'
import LoginPage from './components/pages/Login'
import AdminHome from './components/pages/Admin/AdminHome'

import {Row, Column} from 'simple-flexbox'

import Button from '@material-ui/core/Button'

import './App.css'

//Links go here
const Home = () => (
  <HomePage />
)
const About = () => (
  <AboutPage />
)
const Login = () => (
  <LoginPage />
)
const AdminH = () => (
  <AdminHome />
)



//Start of Router
const RouterBoi = () => (
  <Router>
    <div>
      <Row vertical='center' horizontal='spaced' flexGrow='1' justifyItems='space-around' style={divStyle.all}>
          <Row vertical='center' horizontal='spaced' flexGrow='1' alignItems='start'>
            <Row>
              <Link to="/">
                <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Home</Button>
              </Link>
              <Link to="/about">
                <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>About PCP</Button>
              </Link>
            </Row>
          </Row>
          <Column flexGrow='1' alignItems='end'>
            <Link to="/login">
              <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>Login/Signup</Button>
            </Link>
          </Column>
      </Row>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/adminHome" component={AdminH}/>
    </div>
  </Router>
)


const divStyle = {
  all : {
    height : 50,
    backgroundColor : '#000000',
    padding : 10,
  },
};
export default RouterBoi
