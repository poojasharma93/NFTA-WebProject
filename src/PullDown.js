import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter,
  Redirect,
  Link
} from "react-router-dom";

import PullDownDetails from "./PullDownDetails";
import Routes from "./Routes";
import "./PullDown.css";

class PullDown extends Component {
  render() {
    const listId = "";
    return (
      //   <div className="container">

      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light  navbar-default navbar-fixed-top ">
          <div>
            <ul className="navbar-nav">
              <li id="routeListed">
                <NavLink to="/dropdowns" activeClassName="navbar2_li--active">
                  Routes
                </NavLink>
              </li>
              <li id="direction">
                <NavLink to="/direction" activeClassName="navbar2_li--active">
                  Direction
                </NavLink>
              </li>
              <li id="position">
                <NavLink to="/position" activeClassName="navbar2_li--active">
                  Position
                </NavLink>
              </li>
              <li id="fastenedTO">
                <NavLink to="/fastenedTO" activeClassName="navbar2_li--active">
                  Fastened TO
                </NavLink>
              </li>
              <li id="county">
                <NavLink to="/county" activeClassName="navbar2_li--active">
                  County
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <Route
          exact
          path="/dropdowns"
          render={() => <Routes status={"route"} />}
        />
        <Route
          exact
          path="/direction"
          render={() => <PullDownDetails status={"direction"} />}
        />
        <Route
          exact
          path="/position"
          render={() => <PullDownDetails status={"position"} />}
        />
        <Route
          exact
          path="/fastenedTo"
          render={() => <PullDownDetails status={"fastenedTo"} />}
        />
        <Route
          exact
          path="/county"
          render={() => <PullDownDetails status={"county"} />}
        />
      </div>
    );
  }
}

export default PullDown;
