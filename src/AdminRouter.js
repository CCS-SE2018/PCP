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
import AdminMgs from './components/pages/Admin/AdminMsgs'
import Products from './components/pages/Admin/MaintProducts'
import Supermarkets from './components/pages/Admin/MaintSupermarkets'
import Users from './components/pages/Admin/MaintUsers'

import {Row, Column} from 'simple-flexbox'

import Button from '@material-ui/core/Button'

import './App.css'

//Links go here
const AdminH = () => (
  <AdminHome />
)
const Msgs = () => (
  <AdminMgs />
)
const Prod = () => (
  <Products />
)
const SprM = () => (
  <Supermarkets />
)
const Usr = () => (
  <Users />
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
          <Link to="/admin/msg">
            <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>
              Messages
            </Button>
          </Link>
          <Link to="/admin/prods">
            <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>
              Manage Supermarkets
            </Button>
          </Link>
          <Link to="/admin/superM">
            <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>
              Manage Products
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button color="inherit" variant='contained' style={{backgroundColor : '#999999', color : 'white'}}>
              Manage Users
            </Button>
          </Link>
        </Column>
      </Column>
      
      <Route path="/admin/home" component={AdminH}/>
      <Route path="/admin/msg" component={Msgs}/>
      <Route path="/admin/prods" component={Prod}/>
      <Route path="/admin/superM" component={SprM}/>
      <Route path="/admin/users" component={Users}/>
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
