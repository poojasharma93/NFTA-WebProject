import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

const cookies = new Cookies();

class PullDownDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdowns: [],
      error: "",
      dropdownPopup: false,
      dropdownId: "",
      dropdownInfo: "",
      message: "",
      addDropdownResult: "",
      redirect: false,
      fieldErrors: {}
    };
  }

  validateFields = e => {
    e.preventDefault();
    this.setState({ addDropdownResult: "" });
    let fieldErrors = {};
    let isValid = true;
    this.setState({ message: "" });

    if (!this.state.dropdownInfo) {
      isValid = false;
      fieldErrors["dropdownInfo"] =
        "Please enter " + this.props.status + "Info";
    }

    console.log(fieldErrors);
    console.log(isValid);
    this.setState({ fieldErrors: fieldErrors });
    if (isValid) this.addDropdown();
  };

  closeDropdownPopup = e => {
    e.preventDefault();
    this.handleOnClose(this.state);
  };

  handleOnClose = e => {
    window.location.reload();
  };

  handleDropdownInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  async addDropdown() {
    console.log(this.state.dropdownId, this.state.dropdownInfo);
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
          dropdown_value: this.state.dropdownId,
          display_name: this.state.dropdownInfo,
          dropdown_type: this.props.status
        })
      })
        .then(response => response.json())
        .then(result => this.setState({ addDropdownResult: result }))
        .catch(error => this.setState({ error: error }));
    } catch (e) {
      this.setState({ error: e });
      console.log(e);
    }

    console.log("addDropdownResult", this.state.addDropdownResult);
    if (this.state.addDropdownResult.status === 500) {
      this.setState({ message: "Id and Value should be Unique" });
    } else if (this.state.addDropdownResult === "") {
      this.setState({ message: "Added successfully!" });
    } else {
      this.setState({ message: this.state.addDropdownResult });
    }
  }

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
            dropdowns: data
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );

    console.log("state", this.state.dropdowns);
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
        .then(result => this.setState({ deleteDropdownResult: result }))
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
    const { dropdowns } = this.state;
    console.log(dropdowns);

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{this.props.status} ID</th>
              <th scope="col">{this.props.status} Info</th>
              <th scope="col">Delete</th>
            </tr>
            {dropdowns.map(dropdown => (
              <tr key={dropdown.dropdown_id}>
                <td> {dropdown.dropdown_value} </td>
                <td> {dropdown.display_name}</td>
                <td>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={() =>
                      this.handleOnClick(this, dropdown.dropdown_id)
                    }
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
            data-target="#addDropdown"
          >
            Add {this.props.status}
          </button>

          <div
            className="modal fade"
            id="addDropdown"
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
                </div>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="row">
                      {this.props.status} ID
                      <input
                        type="number"
                        className="form-control ml-2 mb-2 mr-sm-4"
                        name="dropdownId"
                        onChange={this.handleDropdownInput}
                      />
                    </div>
                    <div className="row">
                      {this.props.status} Info
                      <input
                        type="text"
                        className="form-control ml-2 mb-2 mr-sm-4"
                        name="dropdownInfo"
                        onChange={this.handleDropdownInput}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.fieldErrors["dropdownInfo"]}
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
                    Save {this.props.status}
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.closeDropdownPopup}
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

export default PullDownDetails;
