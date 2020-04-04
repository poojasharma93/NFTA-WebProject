import React from 'react';
import {
    BrowserRouter,
    Redirect,
    Router,
    Switch,
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import Home from "./Home";
import LoginPage from './LoginPage';
import TransactionDetail from './TransactionDetail';
import ServiceRequest from "./ServiceRequest";
import OpenServiceRequest from "./OpenServiceRequest";
import TransactionInProgress from "./TransactionInProgress";
import TransactionResolved from "./TransactionResolved";
import ServiceRequestDetail from "./ServiceRequestDetail";

class App extends React.Component {


  render () {
    return (
        <div>
       <BrowserRouter>
       <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/(transactions|open|inprogress|resolved|transactionDetail|serviceRequest|serviceRequestDetail|routes)" component={Home} />
            <Route
                path="/transactionDetail/:trans"
                component={Home}
                exact
              />

              <Route path="/serviceRequestDetail/:servReq" component={Home} exact />
        </Switch>
        </BrowserRouter>
       
        </div>

 
    )
  }
}

export default App;



