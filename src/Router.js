import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import HomePage from './components/pages/HomePage'
import AboutPage from './components/pages/About'
import LoginPage from './components/pages/Login'

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

//Start of Router
const RouterBoi = () => (
  <Router>
    <div>
      <div class="row" style={divStyle.all}>
        <div class="left-align">
          <div class="col s6">
            <Link to="/"><a class="waves-effect waves-light btn-small">Home</a></Link>
            <Link to="/about"><a class="waves-effect waves-light btn-small">About PCP</a></Link>
          </div>
        </div>
        <div class="right-align">
          <div class="col s6" >
            <Link to="/login"><a class="waves-effect waves-light btn-small">Login / SignUp</a></Link>
          </div>
        </div>
      </div>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
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
