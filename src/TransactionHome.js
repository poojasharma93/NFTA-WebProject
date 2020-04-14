import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter,
  Redirect,
  Link
} from "react-router-dom";
import OpenServiceRequest from "./OpenServiceRequest";
import TransactionInProgress from "./TransactionInProgress";
import TransactionResolved from "./TransactionResolved";
import LoginPage from "./LoginPage";
import "./App.css";

class TransactionHome extends Component {
  render() {
    const listId = "";
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light  navbar-default navbar-fixed-top">
          <div>
            <ul className="one navbar-nav">
              <li id="open">
                <NavLink
                  to="/transactions"
                  activeClassName="navbar2_li--active"
                >
                  Open
                </NavLink>
              </li>
              <li id="In Progress">
                <NavLink to="/inprogress" activeClassName="navbar2_li--active">
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

        <Route exact path="/transactions" component={OpenServiceRequest} />
        <Route exact path="/inprogress" component={TransactionInProgress} />
        <Route exact path="/resolved" component={TransactionResolved} />
      </div>
    );
  }
}

export default TransactionHome;
