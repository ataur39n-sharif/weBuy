import React, { createContext, useState } from "react";
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Homepage from "./component/HomePage/Homepage";
import Admin from "./component/Admin/Admin";
import LogIn from "./component/LogIn/LogIn";
import Products from "./component/Products/Products";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import CheckOut from "./component/CheckOut/CheckOut";
import ManageProducts from "./component/Admin/ManageProducts";
import Shipment from "./component/CheckOut/Shipment";
import Orders from "./component/Orders/Orders";

export const userContext = createContext()

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  console.log(loggedInUser);

  const {userLoggedIn,name ,email,img} =loggedInUser

  const handelLogOut =() => {
    const newUser = {
      userLoggedIn: false,
      loggedInUser : ''
    }
    setLoggedInUser(newUser)
  }

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>WeBuy</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/admin'>Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/manage'>Manage Products </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/products'>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/orders'>Orders</Link>
              </li>
              <li className="nav-item">
                {
                  userLoggedIn ?<Link className="nav-link" to='/'><button className="btn btn-warning " onClick={handelLogOut}> <img style={{borderRadius: '50%', height: '50px'}} src={img} alt=""/> {name}</button></Link>:<Link className="nav-link" to='/login'>LogIn</Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
        <Products></Products>
        </Route>
        <PrivateRoute path="/admin">
          <Admin></Admin>
        </PrivateRoute>
        <Route path="/login">
          <LogIn></LogIn>
        </Route>
        <Route path="/products">
          <Products></Products>
        </Route>
        <PrivateRoute path="/manage">
          <ManageProducts></ManageProducts>
        </PrivateRoute>
        <PrivateRoute exact path="/checkOut">
          <CheckOut></CheckOut>
        </PrivateRoute>
        <PrivateRoute path="/checkOut/:key">
          <CheckOut></CheckOut>
        </PrivateRoute>
        <PrivateRoute path="/shipment">
          <Shipment></Shipment>
        </PrivateRoute>
        <PrivateRoute path="/orders">
          <Orders></Orders>
        </PrivateRoute>
      </Switch>
    </Router>
    </userContext.Provider>
  );
}

export default App;
