import React, { Component } from "react";
import "./App.css";
import ChangePassword from "./ChangePassword";
import Alert from "react-s-alert";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

const cookies = new Cookies();

class AccountInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      userUpdateResult: "",
      error: "",
      message: "",
      fieldErrors: {},
      redirect: false,
      addUserResult: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      contactInfo: ""
    };
  }

  componentDidMount() {
    fetch(window.$url + "/users", {
      headers: {
        Authorization: "Bearer " + cookies.get("usertoken")
      }
    })
      .then(results => {
        if (results.status === 401) {
          this.setState({ redirect: true });
        } else {
          return results.json();
        }
      })
      .then(
        data => {
          !this.state.redirect &&
            this.setState({
              user: data.filter(us => {
                return us.username == cookies.get("username");
              })
            });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }

  validateFields = e => {
    e.preventDefault();
    let fieldErrors = {};
    let isValid = true;
    // if (!this.state.username) {
    //   isValid = false;
    //   fieldErrors["username"] = "Please enter email ID";
    // } else {
    //   let lastAtPos = this.state.username.lastIndexOf("@");
    //   let lastDotPos = this.state.username.lastIndexOf(".");

    //   if (
    //     !(
    //       lastAtPos < lastDotPos &&
    //       lastAtPos > 0 &&
    //       this.state.username.indexOf("@@") == -1 &&
    //       lastDotPos > 2 &&
    //       this.state.username.length - lastDotPos > 2
    //     )
    //   ) {
    //     isValid = false;
    //     fieldErrors["username"] = "Please enter a valid email ID";
    //   }
    // }

    // if (!this.state.password) {
    //   isValid = false;
    //   fieldErrors["password"] = "Please enter password";
    // } else if (
    //   this.state.password.length < 4 ||
    //   this.state.password.length > 10
    // ) {
    //   isValid = false;
    //   fieldErrors["password"] =
    //     "Password should be atleast 4 and maximum 10 characters.";
    // }

    if (!this.state.user[0]["first_name"]) {
      isValid = false;
      fieldErrors["firstName"] = "Please enter first name";
    }
    if (this.state.firstName && !this.state.firstName.match(/^[a-zA-Z]+$/)) {
      isValid = false;
      fieldErrors["name"] = "Please enter only letters in name";
    }
    if (this.state.lastName && !this.state.lastName.match(/^[a-zA-Z]+$/)) {
      isValid = false;
      fieldErrors["lastName"] = "Please enter only letters in name";
    }
    if (this.state.contactInfo && this.state.contactInfo.length !== 10) {
      isValid = false;
      fieldErrors["contactInfo"] = "Contact should be of 10 digits.";
    }

    console.log(fieldErrors);
    console.log(isValid);
    this.setState({ fieldErrors: fieldErrors });
    if (isValid) this.postData();
  };

  async postData() {
    console.log(this.state.user[0]);
    try {
      const result = await fetch(window.$url + "/user/update/details", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + cookies.get("usertoken")
        },

        body: JSON.stringify(this.state.user[0])
      })
        .then(response => response.json())
        .then(result => this.setState({ userUpdateResult: result }))
        .catch(error => this.setState({ error: error }));
    } catch (e) {
      this.setState({ error: e });
      console.log(e);
    }

    console.log("userUpdateResult", this.state.userUpdateResult);
    if (this.state.userUpdateResult.status === 500) {
      this.setState({ message: "Username should be Unique" });
      Alert.error("Username should be Unique", {
        position: "top-right",
        effect: "slide",
        offset: 100,
        timeout: 4000
      });
    } else if (this.state.userUpdateResult === "") {
      this.setState({ message: "Updated successfully!" });
      Alert.success("Updated successfully!", {
        position: "top-right",
        effect: "slide",
        offset: 100,
        timeout: 4000
      });
    } else {
      this.setState({ message: this.state.userUpdateResult });
      Alert.error("Some error occured", {
        position: "top-right",
        effect: "slide",
        offset: 100,
        timeout: 4000
      });
    }
  }
  handlefirst_name = e => {
    this.setState({ firstName: e.target.value });
    this.state.user[0]["first_name"] = e.target.value;
  };
  handlelast_name = e => {
    this.setState({ lastName: e.target.value });
    this.state.user[0]["last_name"] = e.target.value;
  };
  handleemail_id = e => {
    this.state.user[0]["username"] = e.target.value;
  };
  handlecontact_info = e => {
    this.setState({ contactInfo: e.target.value });
    this.state.user[0]["contact_info"] = e.target.value;
    console.log(this.state.user[0]["contact_info "]);
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { status: "401" }
          }}
        />
      );
    }
    console.log(this.state.user);

    return (
      <div class="container-fluid selector-for-some-widget">
        <h3 className="heading">User Management</h3>
        {this.state.user.map(admin => (
          <form key={admin.username} className="formDetail">
            <div class="row justify-content-center">
              <div class="col-md-4 mb-6 ">
                <label for="validationDefault01">User Name</label>
                <input
                  type="email"
                  class="form-control"
                  id="validationDefault01"
                  defaultValue={admin.username}
                  // onInput={this.handleemail_id.bind(this)}
                  disabled={true}
                />
                <span style={{ color: "red" }}>
                  {this.state.fieldErrors["username"]}
                </span>
              </div>
            </div>
            <h1></h1>
            <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">first_name</label>

                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  defaultValue={admin.first_name}
                  onInput={this.handlefirst_name.bind(this)}
                />
                <span style={{ color: "red" }}>
                  {this.state.fieldErrors["firstName"]}
                </span>
                <span style={{ color: "red" }}>
                  {this.state.fieldErrors["name"]}
                </span>
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">last_name</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  defaultValue={admin.last_name}
                  onInput={this.handlelast_name.bind(this)}
                />
                <span style={{ color: "red" }}>
                  {this.state.fieldErrors["lastName"]}
                </span>
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">Contact Info</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  defaultValue={admin.contact_info}
                  onInput={this.handlecontact_info.bind(this)}
                />
                <span style={{ color: "red" }}>
                  {this.state.fieldErrors["contactInfo"]}
                </span>
              </div>
            </div>

            <div class="text_center">
              <button
                type="button"
                class=" btn-lg btn-primary col-md-2 mb-3 dividerheight"
                href="#/{trans.status}"
                // onClick={() => this.postData()}
                onClick={this.validateFields}
              >
                Save Changes
              </button>
              <div class="divider" />
            </div>
            <div class="row">
              <ChangePassword user={this.state.user} />
            </div>
            <div class="divider" />
            <div class="text_center">
              <a
                href="/"
                type="button"
                class="btn-lg btn-success col-md-2 mb-6 dividerheight"
              >
                Home Page
              </a>
            </div>
          </form>
        ))}
        <Alert stack={{ limit: 3, spacing: 50 }} />
      </div>
    );
  }
}

export default AccountInformation;
