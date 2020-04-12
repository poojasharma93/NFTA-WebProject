import React, { Component } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { object } from "yup";
import ChangePassword from "./ChangePassword";
import Alert from "react-s-alert";
import Cookies from "universal-cookie";

import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

const cookies = new Cookies();

class AccountInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
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
  async postData() {
    console.log(this.state.user[0]);
    try {
      const result = await fetch(window.$url + "/user/update/details", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + cookies.get("usertoken")
        },

        body: JSON.stringify(this.state.user[0])
      });
    } catch (e) {
      console.log(e);
    }
  }
  handlefirst_name = e => {
    this.state.user[0]["first_name"] = e.target.value;
  };
  handlelast_name = e => {
    this.state.user[0]["last_name"] = e.target.value;
  };
  handleemail_id = e => {
    this.state.user[0]["username "] = e.target.value;
  };

  render() {
    console.log(this.state.user);
    return (
      <div class="container-fluid selector-for-some-widget">
        <h3 className="heading">User Management</h3>
        {this.state.user.map(admin => (
          <form key={admin.username} className="formDetail">
            <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">Email_id</label>
                <input
                  type="email"
                  class="form-control"
                  id="validationDefault01"
                  defaultValue={admin.username}
                  onInput={this.handleemail_id.bind(this)}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">first_name</label>

                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  defaultValue={admin.first_name}
                  onInput={this.handlefirst_name.bind(this)}
                />
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
              </div>
            </div>

            <div class="text_center">
              <button
                type="button"
                class=" btn-lg btn-primary col-md-2 mb-3 dividerheight"
                href="#/{trans.status}"
                onClick={() => this.postData()}
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
