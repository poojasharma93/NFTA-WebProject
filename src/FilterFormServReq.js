import React, { Component } from "react";

class FilterFormServReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestUser: "",
      stopID: "",
      direction: "",
      requestType: "",
      requestID: "",
      filtersApplied: {},
      isFiltersApplied: false
    };
  }

  handleUserInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value})
  }

  validateFilters = e =>{
    let filtersApplied={};
    if(this.state.requestID || this.state.requestType || this.state.requestUser || this.state.stopID || this.state.direction){
        filtersApplied["requestID"] = this.state.requestID;
        filtersApplied["requestType"] = this.state.requestType;
        filtersApplied["requestUser"] = this.state.requestUser;
        filtersApplied["stopID"] = this.state.stopID;
        filtersApplied["direction"] = this.state.direction;
        this.setState({isFiltersApplied: true})
    }
    
    this.setState({filtersApplied: filtersApplied})
    this.submitForm();

  }

  clearFilters = e =>{
    console.log('here')
    this.setState({requestID: "", requestType:"", requestUser:"", stopID:"", direction:"", isFiltersApplied: false});
    this.validateFilters(e);
  }

  displayFilter(name, value){
    return (
    <div id="filterValues" className="text-muted d-inline border-bottom col-md-2">{name} - {value}</div>
    )
  }

  submitForm() {
    //e.preventDefault();
    this.props.handleOnClick(this.state);

  };

  render() {
    return (
      <div className="filterForm">
        <form className="form-inline justify-content-center">
          <div className="row justify-content-center">
            Request ID
            <input
              name="requestID"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              value={this.state.requestID}
              onChange={this.handleUserInput}
            />
            Stop ID
            <input
              name="stopID"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              value={this.state.stopID}
              onChange={this.handleUserInput}
            />
            Direction
            <input
              name="direction"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              value={this.state.direction}
              onChange={this.handleUserInput}
            />
          </div>
          <div className="row justify-content-center">
            Request Type
            <input
              name="requestType"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              value={this.state.requestType}
              onChange={this.handleUserInput}
            />
            Request User
            <input
              name="requestUser"
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              value={this.state.requestUser}
              onChange={this.handleUserInput}
            />
            </div>
            <div className="row justify-content-center">
            <input
              type="button"
              value="Submit"
              className="form-control ml-2 mb-2 mr-sm-4"
              onClick={this.validateFilters}
            />
          </div>
          {this.state.isFiltersApplied && 
            <div><i><b>Filters: &nbsp; </b>
            
            {this.state.filtersApplied["requestID"] && this.displayFilter("Request ID", this.state.filtersApplied["requestID"])}
              {this.state.filtersApplied["stopID"] && this.displayFilter("Stop ID", this.state.filtersApplied["stopID"])}
              {this.state.filtersApplied["direction"] && this.displayFilter("Direction", this.state.filtersApplied["direction"])}
              {this.state.filtersApplied["requestType"] && this.displayFilter("Request Type", this.state.filtersApplied["requestType"])}
              {this.state.filtersApplied["requestUser"] && this.displayFilter("Request User", this.state.filtersApplied["requestUser"])}
              <button className="btn btn-link" onClick={this.clearFilters}>Clear All</button>
            </i></div>}
        </form>


      </div>
    );
  }
}

export default FilterFormServReq;
