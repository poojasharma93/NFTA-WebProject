import React, { Component } from "react";

class FilterFormServReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestUser: "",
      stopID: "",
      direction: "",
      requestType: "",
      requestID: ""
    };
  }

  submitForm = e => {
    e.preventDefault();
    this.props.handleOnClick(this.state);
  };

  handleRequestUserChange = e => {
    console.log(e.target.value);
    this.setState({
      requestUser: e.target.value
    });
  };

  handleStopIDChange = e => {
    console.log(e.target.value);
    this.setState({
      stopID: e.target.value
    });
    // console.log(this.stopID);
  };

  handleDirectionChange = e => {
    console.log(e.target.value);
    this.setState({
      direction: e.target.value
    });
  };

  handleRequestTypeChange = e => {
    console.log(e.target.value);
    this.setState({
      requestType: e.target.value
    });
  };

  handleRequestIDChange = e => {
    console.log(e.target.value);
    this.setState({
      requestID: e.target.value
    });
  };

  render() {
    return (
      <div className="filterForm">
        <form className="form-inline justify-content-center">
          <div className="row">
            Request ID{" "}
            <input
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleRequestIDChange}
            />
            Stop ID{" "}
            <input
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleStopIDChange}
            />
            Direction{" "}
            <input
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleDirectionChange}
            />
          </div>
          <div className="row">
            Request Type{" "}
            <input
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleRequestTypeChange}
            />
            Request User{" "}
            <input
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleRequestUserChange}
            />
            <input
              type="button"
              value="Submit"
              className="form-control ml-2 mb-2 mr-sm-4"
              onClick={this.submitForm}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default FilterFormServReq;
