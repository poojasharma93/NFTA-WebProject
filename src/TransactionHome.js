import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Link
} from "react-router-dom";
import OpenServiceRequest from "./OpenServiceRequest";
import TransactionInProgress from "./TransactionInProgress";
import TransactionResolved from "./TransactionResolved";
import TransactionDetail from "./TransactionDetail";

class TransactionHome extends Component {
  render() {
    const listId = "";
    return (
      <div className="container">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light  navbar-default navbar-fixed-top">
            <div>
              <ul className="navbar-nav">
                <li id="open">
                  <NavLink to="/open" activeClassName="navbar2_li--active">
                    Open
                  </NavLink>
                </li>
                <li id="In Progress">
                  <NavLink
                    to="/inprogress"
                    activeClassName="navbar2_li--active"
                  >
                    In Progress
                  </NavLink>
                </li>
                <li id="Resolved">
                  <NavLink to="/resolved" activeClassName="navbar2_li--active">
                    Resolved
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" component={OpenServiceRequest} exact />
          <Route path="/open" component={OpenServiceRequest} exact />
          <Route path="/inprogress" component={TransactionInProgress} exact />
          <Route path="/resolved" component={TransactionResolved} exact />
        </Router>
      </div>
    );
  }
}

export default TransactionHome;
