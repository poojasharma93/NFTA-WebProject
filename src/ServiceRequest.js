import React from "react";
import { FormErrors } from "./FormErrors";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import ImageUpload from "./ImageUpload";

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
      additional_information:"",
      status:"Open",
      requested_user: cookies.get('username'),
      fieldErrors: {},
      redirect: false,
      addServiceRequestResult: '',
      modalMessage: '',
      modalStatus:'',
      redirectToTransactions: false
    };
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  validateFields = (e) =>{
      e.preventDefault();
      console.log(this.state)
      let fieldErrors={};
      let isValid=true;
      if(!this.state.request_type){
        isValid=false;
        fieldErrors["request_type"] = "Please select request type"
      }
      if((this.state.request_type==="Update"||this.state.request_type==="Remove") && !this.state.stopId){
        isValid=false;
        fieldErrors["stopID"] = "Stop ID cannot be empty for Request Type: " + this.state.request_type
      }
      if(!this.state.direction){
        isValid=false;
        fieldErrors["direction"] = "Direction cannot be empty"
      }
      if(!this.state.location){
        isValid=false;
        fieldErrors["location"] = "Location cannot be empty"
      }
      if(!this.state.route){
        isValid=false;
        fieldErrors["route"] = "Please select a route"
      }
      console.log(fieldErrors)
      console.log(isValid)
      this.setState({fieldErrors: fieldErrors})
      if(isValid)
          this.postData();
  }

  async postData() {
    let srbody = JSON.stringify({
      stopId: this.state.stopId,
      status: this.state.status,
      direction: this.state.direction,
      location: this.state.location,
      request_type: this.state.request_type,
      reason: this.state.reason,
      route: this.state.route,
      additional_information: this.state.additional_information,
      requested_user: this.state.requested_user
    });

    try {
      await fetch(window.$url+"/addServiceRequest", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + cookies.get("usertoken")
        },

        body: srbody
          // status: "open"
      })
      .then(response => response.json())
      .then(result => this.setState({addServiceRequestResult: result}))
      .catch(error => this.setState({error: error}));
      } catch (e) {
          this.setState({error:e});
      }
      console.log(this.state.addServiceRequestResult)
      if(this.state.addServiceRequestResult.status === undefined)
      {
        this.setState({modalMessage: "Request successfully added with ID: " + this.state.addServiceRequestResult.serviceRequestID,
                      modalStatus: 'success'});
      }
      else if(this.state.addServiceRequestResult.status===401)
      {
          this.setState({redirect:true});
      }
      else{
        this.setState({modalMessage:"Some error occurred. Please try again later",
                      modalStatus: 'error'});
      }
  }

  closePopup = ()=>{
    if(this.state.modalStatus==='success'){
      this.setState({redirectToTransactions: true})
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to={"/"} />;

    if(this.state.redirect){
      return <Redirect to={{
       pathname: '/',
       state: { status: '401' }
   }}/>
  }

    if(this.state.redirectToTransactions){
      return <Redirect to='/transactions'/>
    }

    return(
      <div className="container-fluid selector-for-some-widget">
      <h3 className="heading">New Service Request</h3>
    <form className="formDetail">
      <div className="row">
        <div className="col-md-4 mb-6">
          Stop ID
          <input
            type="text"
            className="form-control"
            name="stopId"
            value={this.state.stopId}
            onChange={this.handleUserInput}
          />
          <span style={{color: "red"}}>{this.state.fieldErrors["stopID"]}</span>
        </div>
        <div className="col-md-4 mb-6">
          Direction
          <input
            type="text"
            className="form-control"
            name="direction"
            value={this.state.direction}
            onChange={this.handleUserInput}
          />
          <span style={{color: "red"}}>{this.state.fieldErrors["direction"]}</span>
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
          <span style={{color: "red"}}>{this.state.fieldErrors["location"]}</span>
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
            <option></option>
            <option>New</option>
            <option>Update</option>
            <option>Remove</option>
          </select>
          <span style={{color: "red"}}>{this.state.fieldErrors["request_type"]}</span>
        </div>
        <div className="col-md-4 mb-6">
          Reason
          <input
            type="text"
            className="form-control"
            name="reason"
            value={this.state.reason}
            onChange={this.handleUserInput}
          />
        </div>
        <div className="col-md-4 mb-6">
          Route
          <input
            type="text"
            className="form-control"
            name="route"
            value={this.state.route}
            onChange={this.handleUserInput}
          />
          <span style={{color: "red"}}>{this.state.fieldErrors["route"]}</span>
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
            onChange={this.handleUserInput}
          ></textarea>
        </div>

        <li></li>`
        <dividerheight />
        <ImageUpload />
        {/* {this.state.isSubmitted && <ImageUpload data={this.state} />} */}

        </div>
        <div className="divider" />
              <button type="submit" className="btn btn-primary" onClick={this.validateFields} data-toggle="modal" data-target="#responseServiceRequest"> Submit </button>
      </form>
      


      <div className="modal fade" id="responseServiceRequest" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-body">
                <div className="container">
                    <div className="row justify-content-md-center" style={{color: "blue"}}>
                        {this.state.modalMessage}
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss='modal' onClick={this.closePopup}>Ok</button>
            </div>
            </div>
          </div>
        </div>
      </div>


    )
  }
}

export default ServiceRequest;
