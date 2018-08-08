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
const AdminH = () => (
  <AdminHome />
)



//Start of Router
const RouterBoi = () => (
  <Router>
    <div>
      <Column vertical='center' horizontal='spaced' flexGrow='1' justifyItems='space-around'>
        <Column>
          <Link to="/admin/home">
            <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
              Administrator Page
            </Button>
          </Link>
          <Link to="/about">
            <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>
              PCP Profile
            </Button>
          </Link>
          <Link to="/about">
            <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>
              Messages
            </Button>
          </Link>
          <Link to="/about">
            <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>
              Manage Supermarkets
            </Button>
          </Link>
          <Link to="/about">
            <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>
              Manage Products
            </Button>
          </Link>
          <Link to="/about">
            <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>
              Manage Users
            </Button>
          </Link>
        </Column>
      </Column>
      
      <Route path="/admin/home" component={AdminH}/>
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
