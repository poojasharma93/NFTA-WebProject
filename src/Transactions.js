import React, { Component } from "react";
import {
    BrowserRouter,
    Router,
    Switch,
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import TransactionDetail from "./TransactionDetail";
  import OpenServiceRequest from "./OpenServiceRequest";
  import TransactionInProgress from "./TransactionInProgress";
  import TransactionResolved from "./TransactionResolved";
  import ServiceRequestDetail from "./ServiceRequestDetail";
  import TransactionHome from "./TransactionHome";
import ServiceRequest from "./ServiceRequest";
//import Transactions from "./Transactions";

class Transactions extends Component {
  
    render() {
      return (
        <BrowserRouter>
          <div id="container">
        <nav id="sidebar">
              <div className="sidebar-header">
                <h3>NFTA</h3>
              </div>
              <ul className="list">
                <li>
                  <a href="/transactions">Transactions</a>
                </li>
                <li>
                  <NavLink
                    to="/serviceRequest"
                    activeClassName="navbar__link--active"
                    exact
                  >
                    Service Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/routes"
                    activeClassName="navbar__link--active"
                    exact
                  >
                    Routes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/users"
                    activeClassName="navbar__link--active"
                    exact
                  >
                    Maintain Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/account"
                    activeClassName="navbar__link--active"
                    exact
                  >
                    Account Information
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/logout"
                    activeClassName="navbar__link--active"
                    exact
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/transactions" component={TransactionHome} exact />
              <Route path="/serviceRequest" component={ServiceRequest} exact />
              <Route path="/open" component={OpenServiceRequest} exact />
              <Route
                path="/inprogress"
                component={TransactionInProgress}
                exact
              />
              <Route path="/resolved" component={TransactionResolved} exact />
              <Route
                path="/transactionDetail/:trans"
                component={TransactionDetail}
                exact
              />
              <Route path="/serviceRequestDetail/:servReq" component={ServiceRequestDetail} exact />
            </Switch>
            </div>
        </BrowserRouter>

      )
    }

}

export default Transactions;