import React from "react";
// import Popup from "reactjs-popup";
import { FormErrors } from "./FormErrors";
import ImageUpload from "./ImageUpload";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

const cookies = new Cookies();
class ServiceRequest extends React.Component {
  constructor() {
    super();
    this.state = {
      stopId: "",
      direction: "",
      location: "",
      request_type: "",
      reason: "",
      route: "",
      additionalInformation: "",
      status: "Open",

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
      image2: "",
      request_type: "",
      status: "Open",
      requested_user: cookies.get("username"),
      fieldErrors: {},
      redirect: false,
      addServiceRequestResult: "",
      modalMessage: "",
      modalStatus: "",
      redirectToTransactions: false
    };
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  validateFields = e => {
    e.preventDefault();
    console.log(this.state);
    let fieldErrors = {};
    let isValid = true;
    if (!this.state.request_type) {
      isValid = false;
      fieldErrors["request_type"] = "Please select request type";
    }
    if (
      (this.state.request_type === "Update" ||
        this.state.request_type === "Remove") &&
      !this.state.stopId
    ) {
      isValid = false;
      fieldErrors["stopID"] =
        "Stop ID cannot be empty for Request Type: " + this.state.request_type;
    }
    if (!this.state.direction) {
      isValid = false;
      fieldErrors["direction"] = "Direction cannot be empty";
    }
    if (!this.state.location) {
      isValid = false;
      fieldErrors["location"] = "Location cannot be empty";
    }
    if (!this.state.route) {
      isValid = false;
      fieldErrors["route"] = "Please select a route";
    }
    console.log(fieldErrors);
    console.log(isValid);
    this.setState({ fieldErrors: fieldErrors });
    if (isValid) this.postData();
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
    this.setState({ isSubmitted: false });
    console.log(this.state.isSubmitted);

    try {
      await fetch(window.$url + "/addServiceRequest", {
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
            // direction: this.state.direction,
            location: this.state.location,
            request_type: this.state.request_type,
            reason: this.state.reason,
            // route: this.state.route,
            additional_information: this.state.additionalInformation,
            image0: this.state.image0,
            image1: this.state.image1,
            image2: this.state.image2
          }

          // status: "open"
        )
      })
        .then(response => response.json())
        .then(result => this.setState({ addServiceRequestResult: result }))
        .catch(error => this.setState({ error: error }));
    } catch (e) {
      this.setState({ error: e });
    }
    console.log(this.state.addServiceRequestResult);
    if (this.state.addServiceRequestResult.status === undefined) {
      this.setState({
        modalMessage:
          "Request successfully added with ID: " +
          this.state.addServiceRequestResult.serviceRequestID,
        modalStatus: "success"
      });
    } else if (this.state.addServiceRequestResult.status === 401) {
      this.setState({ redirect: true });
    } else {
      this.setState({
        modalMessage: "Some error occurred. Please try again later",
        modalStatus: "error"
      });
    }
    this.setState({ isSubmitted: false });
    console.log(this.state.isSubmitted);
  }

  closePopup = () => {
    if (this.state.modalStatus === "success") {
      this.setState({ redirectToTransactions: true });
    }
  };

  render() {
    if (this.state.redirect) return <Redirect to={"/"} />;

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

    if (this.state.redirectToTransactions) {
      return <Redirect to="/transactions" />;
    }
    return (
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
              <span style={{ color: "red" }}>
                {this.state.fieldErrors["stopID"]}
              </span>
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
              <span style={{ color: "red" }}>
                {this.state.fieldErrors["direction"]}
              </span>
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
              <span style={{ color: "red" }}>
                {this.state.fieldErrors["location"]}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-6">
              Request Type
              <select
                className="col-md-12 mb-6 "
                name="request_type"
                value={this.state.request_type}
                onInput={this.handleUserInput}
              >
                <option></option>
                <option>New</option>
                <option>Update</option>
                <option>Remove</option>
              </select>
              <span style={{ color: "red" }}>
                {this.state.fieldErrors["request_type"]}
              </span>
            </div>
            <div className="col-md-4 mb-6">
              <label for="validationDefault02">Reason</label>
              <input
                type="text"
                className="form-control"
                name="reason"
                value={this.state.reason}
                onInput={this.handleUserInput}
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
              <span style={{ color: "red" }}>
                {this.state.fieldErrors["route"]}
              </span>
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
                onInput={this.handleUserInput}
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
          type="button"
          className="btn btn-primary"
          onClick={this.validateFields}
          data-toggle="modal"
          data-target="#responseServiceRequest"
        >
          {" "}
          Submit{" "}
        </button>

        <div
          className="modal fade"
          id="responseServiceRequest"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container-fluid">
                  <div
                    className="row justify-content-md-center"
                    style={{ color: "blue" }}
                  >
                    {this.state.modalMessage}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.closePopup}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceRequest;
