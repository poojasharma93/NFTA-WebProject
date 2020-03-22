import React, { Component } from 'react';
import './App.css';
import TransactionHome from './TransactionHome';
import ServiceRequest from './ServiceRequest';
import {BrowserRouter, Router, Switch, Route, NavLink, HashRouter} from 'react-router-dom';
import TransactionDetail from './TransactionDetail';
import ServiceRequestDetail from './ServiceRequestDetail';

class App extends Component {

  changeClass(e){
    console.log(e.target);
  }

  render() {
    return (
      <BrowserRouter>
     
      <div className="App">
        <div className="wrapper">
            <nav id="sidebar">
            <div className="sidebar-header">
                <h3>NFTA</h3>
            </div>
            <ul className="list">
                <li>
                    <a href="/" >Transactions</a>
                </li>
                <li>
                  <NavLink to="/serviceRequest" activeClassName="navbar__link--active" exact>Service Request</NavLink>
                </li>
                <li>
                    <NavLink to="/routes"  activeClassName="navbar__link--active" exact>Routes</NavLink>
                </li>
                <li>
                    <NavLink to="/users"  activeClassName="navbar__link--active" exact>Maintain Users</NavLink>
                </li>
                <li>
                    <NavLink to="/account"  activeClassName="navbar__link--active" exact>Account Information</NavLink>
                </li>
                <li>
                    <NavLink to="/logout"  activeClassName="navbar__link--active" exact>Logout</NavLink>
                </li>
            </ul>
            </nav>
            
              <Switch>
                <Route path="/" component={TransactionHome} exact/>
                <Route path="/serviceRequest" component={ServiceRequest} exact />
                <Route path="/transactionDetail/:trans" component={TransactionDetail} exact/>
                <Route path="/serviceRequestDetail/:servReq" component={ServiceRequestDetail} exact/>
              </Switch>
              
        </div>
        
        
      </div>
     
      </BrowserRouter>
    );
  }
}

export default App;