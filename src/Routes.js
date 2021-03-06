import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import AddRoutePopup from "./AddRoutePopup";

const cookies = new Cookies();

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      error: "",
      redirect: false,
      deleteRouteResult: ""
    };
  }

  handleOnClose = e => {
    window.location.reload();
  };

  componentDidMount() {
    fetch(window.$url + "/dropdown?dropdownType=route", {
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
            routes: data
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );

    console.log("state", this.state.routes);
  }

  async handleOnClick(e, dropdown_id) {
    let id = dropdown_id;
    try {
      console.log(dropdown_id);
      await fetch(window.$url + "/deleteDropdown", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + cookies.get("usertoken")
        },
        body: JSON.stringify({
          dropdown_id: id
        })
      })
        .then(response => response.text())
        .then(result => this.setState({ deleteRouteResult: result }))
        .catch(error => this.setState({ error: error }));
    } catch (e) {
      this.setState({ error: e });
    }
    this.handleOnClose();
  }

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
    const { routes } = this.state;
    console.log(routes);

    return (
      <div>
        <div className="table-wrapper-scroll-y table-scrollbar">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Route ID</th>
                <th scope="col">Route Info</th>
                <th scope="col">Route Delete</th>
              </tr>
              {routes.map(route => (
                <tr key={route.dropdown_id}>
                  <td> {route.dropdown_value} </td>
                  <td> {route.display_name}</td>
                  <td>
                    {" "}
                    <button
                      type="submit"
                      className="btn btn-danger"
                      onClick={() =>
                        this.handleOnClick(this, route.dropdown_id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
        <div>
          <AddRoutePopup handleOnClose={this.handleOnClose} />
        </div>
      </div>
    );
  }
}

export default Routes;
