import React from 'react';
import {FormErrors} from "./FormErrors";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const cookies = new Cookies();

class ServiceRequest extends React.Component {
  
  constructor() {
    super();
    this.state={
      stopId:"",
      direction:"",
      location:"",
      request_type:"",
      reason:"",
      route:"",
      additionalInformation:"",
      status:"Open",
      requested_user: cookies.get('username'),
      formErrors : {requestType: '', direction: '', location:'',route:''},
      stopIdValid: false,
      requestTypeValid: false,
      directionValid: false,
      locationValid: false,
      routeValid: false,
      formValid: false,
      stopIdError:"",
      directionError:"",
      redirect: false
    };
    
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let stopIdValid = this.state.stopIdValid;
    let directionValid = this.state.directionValid;
    let requestTypeValid = this.state.requestTypeValid;
    let locationValid = this.state.locationValid;
    let routeValid = this.state.routeValid;

    switch(fieldName) {
      case 'stopId':
        stopIdValid = value.length >= 1;
        if(!requestTypeValid && stopIdValid){
          requestTypeValid=true;
          fieldValidationErrors.requestType = '';
        }
        break;
      case 'request_type':
        if(value==="Update" && this.state.stopIdValid){
          requestTypeValid=true;
        }
        fieldValidationErrors.requestType = requestTypeValid ? '': ' Please enter stop ID';
        break;
      case 'direction':
        directionValid = value.length >= 1;
        fieldValidationErrors.direction = directionValid ? '': 'Please enter Direction';
        break;
      case 'location':
        locationValid = value.length >= 1;
        fieldValidationErrors.location = locationValid ? '': 'Please enter Location';
        break;
      case 'route':
        routeValid = value.length >= 1;
        fieldValidationErrors.route = routeValid ? '': 'Please enter Route';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    stopIdValid: stopIdValid,
                    directionValid: directionValid,
                    requestTypeValid: requestTypeValid,
                    locationValid: locationValid,
                    routeValid: routeValid
                  }, this.validateForm);
  }

  validateForm(){
    this.setState({formValid: this.state.requestTypeValid && this.state.directionValid &&
                    this.state.locationValid && this.state.routeValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleStopID = e => {
    // console.log(this.props.match.params.transactionNo);
    // console.log(e.target.value);
    this.setState({stopId: e.target.value});
  };

  handleDirection = e => {
    this.setState({direction: e.target.value});
  }

  handleLocation = e => {
    this.setState({location: e.target.value});
  }

  handleRequestType = e => {
    this.setState({request_type: e.target.value});
  }

  handleReason = e => {
    this.setState({reason: e.target.value});
  }

  handleRoute = e => {
    this.setState({route: e.target.value});
  }

  handleAdditionalInformation = e => {
    this.setState({additional_information: e.target.value});
  }

  async postData() {
    let srbody = JSON.stringify(
      {stopId: this.state.stopId,
      status:this.state.status,
      direction: this.state.direction,
      location: this.state.location,
      request_type: this.state.request_type,
      reason: this.state.reason,
      route: this.state.route,
      additional_information: this.state.additional_information,
      requested_user: this.state.requested_user });

      console.log('Body', srbody);

    try {
      const result = await fetch(window.$url+"/addServiceRequest", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer "+ cookies.get('usertoken')
        },

        body: srbody
          // status: "open"
      });
    } catch (e) {
      console.log(e);
    }

  }

  render() {

    if(this.state.redirect)
      return <Redirect to={'/'}/>

    return(
      <div className="container-fluid selector-for-some-widget">
      <h3 className="heading">New Service Request</h3>
    <form className="formDetail" onSubmit={() => this.postData()}>
      <FormErrors formErrors={this.state.formErrors} />
      <div className="row">
        <div className="col-md-4 mb-6 {`form-group ${this.errorClass(this.state.formErrors.stopId)}`}">
          Stop ID
          <input
            type="text"
            className="form-control"
            name="stopId"
            value={this.state.stopId}
            onChange={this.handleUserInput}
          />
        </div>
        <div className="col-md-4 mb-6 {`form-group ${this.errorClass(this.state.formErrors.stopId)}`}">
          Direction
          <input
            type="text"
            className="form-control"
            name="direction"
            value={this.state.direction}
            onChange={this.handleUserInput}
          />
        </div>
      {/*street_on,nearest_cross_street,position
       */}
        <div className="col-md-4 mb-6">
          Location
          <input
            type="text"
            className="form-control"
            name="location"
            value={this.state.location}
            onChange={this.handleUserInput}
          />
        </div>
        </div>
        <div className="row">
        <div className="col-md-4 mb-6">
          Request Type
          <select
            className="col-md-12 mb-6 "
            name="request_type"
            value={this.state.request_type}
            onChange={this.handleUserInput}
          >
            <option>New</option>
            <option>Update</option>
            <option>Remove</option>
          </select>
          
        </div>
        <div className="col-md-4 mb-6">
          Reason
          <input
            type="text"
            className="form-control"
            name="reason"
            value={this.state.reason}
            onChange={this.handleReason.bind(this)}
          />
        </div>
      {/* 	fastened_to,location,county
       */}
        <div className="col-md-4 mb-6">
          Route
          <input
            type="text"
            className="form-control"
            name="route"
            value={this.state.route}
            onChange={this.handleUserInput}
          />
        </div>
        </div>
        <div className="row">
        <div className="form-group col-md-6 mb-6">
          
            Additional Information
         
          <textarea
            className="form-control"
            name="additional_information"
            rows="3"
            value={this.state.additional_information}
            onChange={this.handleAdditionalInformation.bind(this)}
          ></textarea>
        </div>
        </div>
        <div className="divider" />
              <button
                type="submit"
                disabled={!this.state.formValid}
                className="btn btn-primary"
              >
                Submit
              </button>
           
     
      </form>
      </div>
    )
  }
}

export default ServiceRequest;