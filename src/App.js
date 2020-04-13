import React from "react";
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
import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/confirmreset" component={ResetPassword} />
            <Route exact path="/(transactions|inprogress|resolved|serviceRequest|routes|account|users)" component={Home} />
            <Route
              exact
              path="/(transactions|inprogress|resolved|serviceRequest|routes|account)"
              component={Home}
            />
            <Route path="/transactionDetail/:trans" component={Home} exact />

            <Route
              path="/serviceRequestDetail/:servReq"
              component={Home}
              exact
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
