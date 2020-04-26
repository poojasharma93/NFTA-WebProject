import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class AddRoutePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      routeId: "",
      routeName: "",
      message: "",
      addRouteResult: "",
      fieldErrors: {}
    };
  }

  handleRouteInput = e => {
    const name = e.target.name;
    let value = e.target.value;
    if (name == "routeInfo") {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    this.setState({ [name]: value });
  };

  validateFields = e => {
    e.preventDefault();
    this.setState({ addRouteResult: "" });
    let fieldErrors = {};
    let isValid = true;
    this.setState({ message: "" });
    if (!this.state.routeId) {
      isValid = false;
      fieldErrors["routeId"] = "Please enter routeId";
    }

    if (!this.state.routeInfo) {
      isValid = false;
      fieldErrors["routeInfo"] = "Please enter routeInfo";
    }

    console.log(fieldErrors);
    console.log(isValid);
    this.setState({ fieldErrors: fieldErrors });
    if (isValid) this.addRoute();
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
          dropdown_type: "route"
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
    if (this.state.addRouteResult === "") {
      this.setState({ message: "Added successfully!" });
    } else if (this.state.addRouteResult.status === 500) {
      this.setState({ message: "Id and Value should be Unique" });
    } else {
      this.setState({ message: this.state.addRouteResult });
    }
  }

  closeRoutePopup = e => {
    e.preventDefault();
    this.props.handleOnClose(this.state);
  };

  render() {
    return (
      <div>
        <form className="form-inline justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#addRoute"
          >
            Add Route
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
                    Add Route
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="row">
                      Route ID
                      <input
                        type="number"
                        className="form-control ml-2 mb-2 mr-sm-4"
                        name="routeId"
                        onChange={this.handleRouteInput}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.fieldErrors["routeId"]}
                      </span>
                    </div>
                    <div className="row">
                      Route Info
                      <input
                        type="text"
                        className="form-control ml-2 mb-2 mr-sm-4"
                        name="routeInfo"
                        onChange={this.handleRouteInput}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.fieldErrors["routeInfo"]}
                      </span>
                    </div>
                    <div
                      className="row justify-content-md-center"
                      style={{ color: "blue" }}
                    >
                      {this.state.message}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.validateFields}
                  >
                    Save Route
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
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
      </div>
    );
  }
}

export default AddRoutePopup;
