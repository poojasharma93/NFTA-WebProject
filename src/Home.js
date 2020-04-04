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
  HashRouter
} from "react-router-dom";
import TransactionDetail from "./TransactionDetail";
import OpenServiceRequest from "./OpenServiceRequest";
import TransactionInProgress from "./TransactionInProgress";
import TransactionResolved from "./TransactionResolved";
import ServiceRequestDetail from "./ServiceRequestDetail";
import Routes from "./Routes";

class Home extends Component {

  constructor(props){
    super(props);
    this.state={
      redirect: false
    }
  }

  logout=e=>{
    sessionStorage.setItem('user','');
    this.setState({redirect:true});
  }

  changeClass(e) {
    console.log(e.target);
  }

  componentWillMount(){
    if(sessionStorage.getItem('user')){
      console.log(sessionStorage.getItem('user'));
    }
    else{
      this.setState({redirect:true});
    }

  }

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/'}/>)
    }

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
              
              <Route path="/(transactions|open|inprogress|resolved)" component={TransactionHome} exact/>
              <Route
                path="/transactionDetail/:trans"
                component={TransactionDetail}
                exact
              />
              <Route path="/serviceRequest" component={ServiceRequest} exact />
              <Route path="/serviceRequestDetail/:servReq" component={ServiceRequestDetail} exact />
              <Route path="/routes" component={Routes} exact />
             
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
