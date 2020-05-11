import React, { Component } from "react";
import "./App.css";
import TransactionHome from "./TransactionHome";
import ServiceRequest from "./ServiceRequest";
import {
  BrowserRouter,
  Redirect,
  Router,
  Switch,
  Route,
  NavLink,
  withRouter,
  HashRouter
} from "react-router-dom";
import AccountInformation from "./AccountInformation";
import TransactionDetail from "./TransactionDetail";
import ServiceRequestDetail from "./ServiceRequestDetail";
import Routes from "./Routes";
import PullDown from "./PullDown";
import Cookies from "universal-cookie";

import Users from "./Users";

const cookies = new Cookies();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  logout = e => {
    cookies.remove("usertoken");
    cookies.remove("username");
    this.setState({ redirect: true });
  };

  render() {
    if (
      cookies.get("usertoken") == undefined ||
      cookies.get("usertoken") === ""
    ) {
      return <Redirect to={"/"} />;
    }

    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="App">
        <div className="wrapper">
          <nav id="sidebar">
            <div className="sidebar-header">
              <h3>NFTA</h3>
            </div>
            <ul className="list">
              <li>
                <a href="/requestStatus">Request Status</a>
              </li>
              <li>
                <NavLink
                  to="/serviceRequest"
                  activeClassName="navbar__link--active"
                  exact
                >
                  Request Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dropdowns"
                  activeClassName="navbar__link--active"
                  exact
                >
                  Dropdowns
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
                  to="/"
                  activeClassName="navbar__link--active"
                  exact
                  onClick={this.logout}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route
              path="/(requestStatus|open|inprogress|resolved)"
              component={TransactionHome}
              exact
            />
            <Route
              path="/requestStatusDetail/:trans"
              component={TransactionDetail}
              exact
            />
            <Route path="/serviceRequest" component={ServiceRequest} exact />
            <Route
              path="/serviceRequestDetail/:servReq"
              component={ServiceRequestDetail}
              exact
            />
            <Route
              path="/(dropdowns|direction|position|fastenedTO|county)"
              component={PullDown}
              exact
            />
            {/* Incoming change */}
            <Route path="/account" component={AccountInformation} exact />
            <Route path="/users" component={Users} exact />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Home;
