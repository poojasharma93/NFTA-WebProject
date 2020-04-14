import React, { Component } from "react";

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionNo: "",
      stopID: "",
      direction: "",
      county: "",
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
    if(this.state.transactionNo || this.state.stopID || this.state.direction || this.state.county || this.state.requestID){
        filtersApplied["requestID"] = this.state.requestID;
        filtersApplied["transactionNo"] = this.state.transactionNo;
        filtersApplied["stopID"] = this.state.stopID;
        filtersApplied["county"] = this.state.county;
        filtersApplied["direction"] = this.state.direction;
        this.setState({isFiltersApplied: true})
    }
    
    this.setState({filtersApplied: filtersApplied})
    this.submitForm();

  }

  clearFilters = e =>{
    console.log('here')
    this.setState({transactionNo: "", stopID:"", county:"", requestID:"", direction:"", isFiltersApplied: false});
    this.validateFilters(e);
  }

  displayFilter(name, value){
    return (
    <div id="filterValues" className="text-muted d-inline border-bottom col-md-2">{name} - {value}</div>
    
    )
  }

  submitForm () {
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
              value={this.state.transactionNo}
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleUserInput}
            />
            Stop ID
            <input
              name="stopID"
              value={this.state.stopID}
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleUserInput}
            />
            Direction
            <input
              name="direction"
              value={this.state.direction}
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleUserInput}
            />
          </div>
          <div className="row justify-content-center">
            County
            <input
              name="county"
              value={this.state.county}
              type="text"
              className="form-control ml-2 mb-2 mr-sm-4"
              onChange={this.handleUserInput}
            />
            Request ID
            <input
              name="requestID"
              value={this.state.requestID}
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
              onClick={this.validateFilters}
            />
          </div>

          {this.state.isFiltersApplied && 
            <div><i><b>Filters: &nbsp; </b>
            
            {this.state.filtersApplied["transactionNo"] && this.displayFilter("Transaction No", this.state.filtersApplied["transactionNo"])}
              {this.state.filtersApplied["stopID"] && this.displayFilter("Stop ID", this.state.filtersApplied["stopID"])}
              {this.state.filtersApplied["direction"] && this.displayFilter("Direction", this.state.filtersApplied["direction"])}
              {this.state.filtersApplied["county"] && this.displayFilter("County", this.state.filtersApplied["county"])}
              {this.state.filtersApplied["requestID"] && this.displayFilter("Request ID", this.state.filtersApplied["requestID"])}
              <button className="btn btn-link" onClick={this.clearFilters}>Clear All</button>
            </i></div>}

        </form>
      </div>
    );
  }
}

export default FilterForm;
