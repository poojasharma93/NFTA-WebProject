import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { strict } from "assert";

const cookies = new Cookies();

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
      fieldErrors: "",
      loginResult: "",
      errror: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateFields = e => {
    e.preventDefault();
    let fieldErrors = {};
    let isValid = true;
    if (!this.state.email) {
      isValid = false;
      fieldErrors["email"] = "Please enter Email ID";
    }

    if (!this.state.password) {
      isValid = false;
      fieldErrors["password"] = "Please enter Password";
    }

    console.log(fieldErrors);
    console.log(isValid);
    this.setState({ fieldErrors: fieldErrors });
    if (isValid) this.handleSubmit();
  };

  async handleSubmit() {
    try {
      await fetch(window.$url + "/authenticate", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },

        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password
        })
      })
        .then(response => response.json())
        .then(result => this.setState({ loginResult: result }))
        .catch(error => this.setState({ error: error }));
    } catch (e) {
      this.setState({ error: e });
    }
    console.log(this.state.loginResult);
    if (this.state.loginResult.token === undefined) {
      let fieldErrors = {};
      fieldErrors["loginError"] =
        "Either username or password is incorrect. Please try again";
      this.setState({ fieldErrors: fieldErrors });
    } else {
      cookies.set("usertoken", this.state.loginResult.token, {
        maxAge: 60 * 60 * 3,
        sameSite: strict
      });
      cookies.set("username", this.state.email, {
        maxAge: 60 * 60 * 3,
        sameSite: strict
      });
      this.setState({ redirect: true });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/transactions"} />;
    }

    if (
      cookies.get("usertoken") !== undefined &&
      cookies.get("usertoken") !== "" &&
      this.props.location.state === undefined
    ) {
      return <Redirect to={"/transactions"} />;
    }

    return (
      <div className="container-fluid login-container centered">
        <div className="row">
          <div className="col-md-6 login-form">
            <h3>NFTA Web Console</h3>
            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.fieldErrors["email"]}
                </span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.fieldErrors["password"]}
                </span>
              </div>
              <div className="form-group">
                <input
                  type="button"
                  className="btnSubmit"
                  value="Login"
                  onClick={this.validateFields}
                />
                <br></br>
                <span style={{ color: "red" }}>
                  {this.state.fieldErrors["loginError"]}
                </span>
              </div>
              <div class="form-group">
                <a href="#" class="ForgotPwd">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
