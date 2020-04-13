import React from "react";
// import Popup from "reactjs-popup";
import { FormErrors } from "./FormErrors";
import ImageUpload from "./ImageUpload";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class ServiceRequest extends React.Component {
  constructor() {
    super();
    this.state = {
      stopId: "",
      direction: "",
      location: "",
      requestType: "",
      reason: "",
      route: "",
      additionalInformation: "",
      status: "Open",
      adminUserId: "2",
      formErrors: { requestType: "", direction: "", location: "", route: "" },
      stopIdValid: false,
      requestTypeValid: false,
      directionValid: false,
      locationValid: false,
      routeValid: false,
      formValid: false,
      stopIdError: "",
      directionError: "",
      isSubmitted: true,
      image: [],
      loading: false,
      image0: "",
      image1: "",
      image2: ""
    };
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let stopIdValid = this.state.stopIdValid;
    let directionValid = this.state.directionValid;
    let requestTypeValid = this.state.requestTypeValid;
    let locationValid = this.state.locationValid;
    let routeValid = this.state.routeValid;

    switch (fieldName) {
      case "stopId":
        stopIdValid = value.length >= 1;
        if (!requestTypeValid && stopIdValid) {
          requestTypeValid = true;
          fieldValidationErrors.requestType = "";
        }
        break;
      case "requestType":
        if (value === "Update" && this.state.stopIdValid) {
          requestTypeValid = true;
        }
        fieldValidationErrors.requestType = requestTypeValid
          ? ""
          : " Please enter stop ID";
        break;
      case "direction":
        directionValid = value.length >= 1;
        fieldValidationErrors.direction = directionValid
          ? ""
          : "Please enter Direction";
        break;
      case "location":
        locationValid = value.length >= 1;
        fieldValidationErrors.location = locationValid
          ? ""
          : "Please enter Location";
        break;
      case "route":
        routeValid = value.length >= 1;
        fieldValidationErrors.route = routeValid ? "" : "Please enter Route";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        stopIdValid: stopIdValid,
        directionValid: directionValid,
        requestTypeValid: requestTypeValid,
        locationValid: locationValid,
        routeValid: routeValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.requestTypeValid &&
        this.state.directionValid &&
        this.state.locationValid &&
        this.state.routeValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  handleStopID = e => {
    // console.log(this.props.match.params.transactionNo);
    // console.log(e.target.value);
    this.setState({ stopId: e.target.value });
  };

  handleDirection = e => {
    this.setState({ direction: e.target.value });
  };

  handleLocation = e => {
    this.setState({ location: e.target.value });
  };

  handleRequestType = e => {
    this.setState({ requestType: e.target.value });
  };

  handleReason = e => {
    this.setState({ reason: e.target.value });
  };

  handleRoute = e => {
    this.setState({ route: e.target.value });
  };

  handleAdditionalInformation = e => {
    this.setState({ additionalInformation: e.target.value });
  };

  handleSubmit = async (files, allFiles) => {
    for (var i = 0; i < allFiles.length; i++) {
      const data = new FormData();
      data.append("file", allFiles[i].file);
      data.append("upload_preset", "nftafolder");
      this.setState({ loading: false });

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/nftaproject/image/upload",
        {
          method: "POST",
          headers: { "X-Requested-With": "XMLHttpRequest" },
          body: data
        }
      );
      const file = await res.json();
      if (this.state.image0 == "") {
        this.setState({ image0: file.secure_url });
      } else if (this.state.image1 == "") {
        this.setState({ image1: file.secure_url });
      } else {
        this.setState({ image2: file.secure_url });
      }

      this.setState({ image: [...this.state.image, file.secure_url] });
    }
    console.log(this.state.image0);
    console.log(this.state.image1);
    this.setState({ loading: false });
    allFiles.forEach(f => f.remove());
  };

  async postData(e) {
    e.preventDefault();
    this.setState({ isSubmitted: false });
    console.log(this.state.isSubmitted);

    try {
      const result = await fetch(window.$url + "/addServiceRequest", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + cookies.get("usertoken")
        },

        body: JSON.stringify(
          {
            stopId: this.state.stopId,
            status: this.state.status,
            direction: this.state.direction,
            location: this.state.location,
            request_type: this.state.requestType,
            reason: this.state.reason,
            route: this.state.route,
            additional_information: this.state.additionalInformation,
            admin_user_id: this.state.adminUserId,
            image0: this.state.image0,
            image1: this.state.image1,
            image2: this.state.image2
          }

          // status: "open"
        )
      });
      this.setState({ isSubmitted: false });
      console.log(this.state.isSubmitted);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="container-fluid selector-for-some-widget">
        <h3 className="heading">New Service Request</h3>
        <form className="formDetail">
          <FormErrors formErrors={this.state.formErrors} />
          <div className="row">
            <div className="col-md-4 mb-6 {`form-group ${this.errorClass(this.state.formErrors.stopId)}`}">
              <label for="validationDefault02">Stop ID</label>
              <input
                type="text"
                className="form-control"
                name="stopId"
                value={this.state.stopId}
                onInput={this.handleUserInput}
              />
            </div>
            <div className="col-md-4 mb-6 {`form-group ${this.errorClass(this.state.formErrors.stopId)}`}">
              <label for="validationDefault02">Direction</label>
              <input
                type="text"
                className="form-control"
                name="direction"
                value={this.state.direction}
                onInput={this.handleUserInput}
              />
            </div>
            {/*street_on,nearest_cross_street,position
             */}
            <div className="col-md-4 mb-6">
              <label for="validationDefault01">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={this.state.location}
                onInput={this.handleUserInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-6">
              <label for="validationDefault02">Request Type</label>
              <select
                className="col-md-12 mb-6 "
                name="requestType"
                value={this.state.requestType}
                onInput={this.handleUserInput}
              >
                <option>New</option>
                <option>Update</option>
                <option>Remove</option>
              </select>
            </div>
            <div className="col-md-4 mb-6">
              <label for="validationDefault02">Reason</label>
              <input
                type="text"
                className="form-control"
                name="reason"
                value={this.state.reason}
                onInput={this.handleReason.bind(this)}
              />
            </div>
            {/* 	fastened_to,location,county
             */}
            <div className="col-md-4 mb-6">
              <label for="validationDefault01">Route</label>
              <input
                type="text"
                className="form-control"
                name="route"
                value={this.state.route}
                onInput={this.handleUserInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6 mb-6">
              <label for="exampleFormControlTextarea1">
                Additional Information
              </label>
              <textarea
                className="form-control"
                name="additionalInformation"
                rows="3"
                value={this.state.additionalInformation}
                onInput={this.handleAdditionalInformation.bind(this)}
              ></textarea>
            </div>
          </div>
        </form>
        <div className="ImageUpload">
          <Dropzone
            onSubmit={this.handleSubmit}
            maxFiles={3}
            inputContent="Drop maximum 3 Images"
            inputWithFilesContent={files => `${3 - files.length} more`}
            class="divider"
            type="file"
            name="file"
            accept="image/jpeg, image/png"
            submitButtonContent="Upload"
            //   submitButtonDisabled={files => files.length < 3}
          ></Dropzone>

          {this.state.loading ? (
            <h3>Loading ....</h3>
          ) : (
            this.state.image.map(img => <img src={img} />)
          )}
        </div>
        <h3></h3>
        <div className="divider" />
        <button
          type="submit"
          disabled={!this.state.formValid}
          className="btn btn-primary"
          onClick={e => this.postData(e)}
        >
          Submit
        </button>
        {/* </form> */}
        {/* <li></li>`
        <dividerheight /> */}
        {/* <ImageUpload data={this.state} /> */}
        {/* {this.state.isSubmitted ? <h4></h4> : <ImageUpload data={this.state} />} */}
      </div>
    );
  }
}

export default ServiceRequest;
