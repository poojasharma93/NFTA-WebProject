import React, { Component } from "react";

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionNo: "",
      stopID: "",
      direction: "",
      county: "",
      requestID: ""
    };
  }

  handleUserInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value})
  }

  submitForm = e => {
    e.preventDefault();
    this.props.handleOnClick(this.state);
  };

  render() {
    return (
      <div className="filterForm">
        <form className="form-inline justify-content-center">
          <div className="row justify-content-center">
            Transaction No
            <input
              name="transactionNo"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleUserInput}
            />
            Stop ID
            <input
              name="stopID"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleUserInput}
            />
            Direction
            <input
              name="direction"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleUserInput}
            />
          </div>
          <div className="row justify-content-center">
            County
            <input
              name="county"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleUserInput}
            />
            Request ID
            <input
              name="requestID"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleUserInput}
            />
            </div>
            <div className="row justify-content-center">
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

export default FilterForm;
