import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

const cookies = new Cookies();

class PullDownDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      error: "",
      routePopup: false,
      routeId: "",
      routeName: "",
      message: "",
      addRouteResult: "",
      redirect: false
    };
  }

  closeRoutePopup = e => {
    e.preventDefault();
    this.handleOnClose(this.state);
  };
  handleOnClose = e => {
    window.location.reload();
  };

  handleRouteInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  async addRoute() {
    console.log(this.state.routeId, this.state.routeInfo);
    try {
      await fetch(window.$url + "/addDropdown", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + cookies.get("usertoken")
        },

        body: JSON.stringify({
          dropdown_value: this.state.routeId,
          display_name: this.state.routeInfo,
          dropdown_type: this.props.status
        })
      })
        .then(response => response.json())
        .then(result => this.setState({ addRouteResult: result }))
        .catch(error => this.setState({ error: error }));
    } catch (e) {
      this.setState({ error: e });
      console.log(e);
    }

    console.log("addRouteResult", this.state.addRouteResult);
    if (this.state.addRouteResult.status === 500) {
      this.setState({ message: "Id and Value should be Unique" });
    } else if (this.state.addRouteResult === "") {
      this.setState({ message: "Added successfully!" });
    } else {
      this.setState({ message: this.state.addRouteResult });
    }
  }

  closeModal = e => {
    //window.location.reload();
  };

  componentDidMount() {
    console.log(this.props.status);
    fetch(window.$url + "/dropdown?dropdownType=" + this.props.status, {
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

    if (routes.status === false) {
      return <h1>{routes.message}</h1>;
    }

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{this.props.status} ID</th>
              <th scope="col">{this.props.status} Info</th>
              <th scope="col">Delete</th>
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
                    onClick={() => this.handleOnClick(this, route.dropdown_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </thead>
        </table>

        <form className="form-inline justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#addRoute"
          >
            Add {this.props.status}
          </button>

          <div
            className="modal fade"
            id="addRoute"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    {this.props.status}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="row">
                      {this.props.status} ID
                      <input
                        type="text"
                        className="form-control ml-2 mb-2 mr-sm-4"
                        name="routeId"
                        onChange={this.handleRouteInput}
                      />
                    </div>
                    <div className="row">
                      {this.props.status} Info
                      <input
                        type="text"
                        className="form-control ml-2 mb-2 mr-sm-4"
                        name="routeInfo"
                        onChange={this.handleRouteInput}
                      />
                    </div>
                    <div className="row">{this.state.message}</div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.addRoute()}
                  >
                    Save {this.props.status}
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.closeRoutePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <script>$('#addRoute').on('hidden.bs.modal', function () {});</script>
      </div>
    );
  }
}

export default PullDownDetails;
