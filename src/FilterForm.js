import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      filtersApplied: {},
      fieldErrors: {},
      isFiltersApplied: false
    };
  }

  handleStartDate = date =>{
    this.setState({startDate: date})
  }

  handleEndDate = date =>{
    this.setState({endDate: date})
  }

  validateFilters = e =>{
    let filtersApplied={};
    let fieldErrors={};
    let isValid=true;

    if(this.state.endDate && !this.state.startDate){
      isValid=false;
      fieldErrors["startDate"] = "Please select start date"
      this.setState({isFiltersApplied: false})
    }
    if(this.state.startDate){
        filtersApplied["startDate"] = moment(this.state.startDate).format("YYYY-MM-DD");
        if(!this.state.endDate){
          this.setState({endDate: new Date()})
          filtersApplied["endDate"] = moment(new Date()).format("YYYY-MM-DD");
        }
        else
          filtersApplied["endDate"] = moment(this.state.endDate).format("YYYY-MM-DD");
        this.setState({isFiltersApplied: true})
    }
    this.setState({fieldErrors: fieldErrors})
    this.setState({filtersApplied: filtersApplied})
    if(isValid){
      this.submitForm();
    } 

  }

  clearFilters = e =>{
    console.log('here')
    this.setState({startDate: null, endDate:null, isFiltersApplied: false});
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

    console.log(this.state)

    return (
      <div className="filterForm">
        <form className="form-inline justify-content-center">
          <div className="row justify-content-center">
           
          <DatePicker
              name="startDate"
              selected={this.state.startDate}
              onChange={this.handleStartDate}
              placeholderText="From Date"
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
              className="form-control ml-2 mb-2 mr-sm-4"
            />

            <DatePicker
              name="endDate"
              selected={this.state.endDate}
              onChange={this.handleEndDate}
              placeholderText="End Date"
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
              className="form-control ml-2 mb-2 mr-sm-4"
            />
            <input
              type="button"
              value="Submit"
              className="form-control ml-2 mb-2 mr-sm-4"
              onClick={this.validateFilters}
            />
            </div>
            
            <span style={{color: "red"}}>{this.state.fieldErrors["startDate"]}</span>

          {this.state.isFiltersApplied && 
            <div><i><b>Filters: &nbsp; </b>
            
            {this.state.filtersApplied["startDate"] && this.displayFilter("From Date", this.state.filtersApplied["startDate"])}
              {this.state.filtersApplied["endDate"] && this.displayFilter("To Date", this.state.filtersApplied["endDate"])}
              <button className="btn btn-link" onClick={this.clearFilters}>Clear Date Filter</button>
            </i></div>}
          
        </form>
      </div>
    );
  }
}

export default FilterForm;
