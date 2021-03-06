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
    this.modalButton = React.createRef();
    this.state = {
      stop_id: "",
      direction: "",
      location: "",
      request_type: "",
      reason: "",
      route: {},
      routeArray: [],
      additional_information: "",
      status: "Open",
      requested_user: cookies.get("username"),
      fieldErrors: {},
      redirect: false,
      addServiceRequestResult: "",
      modalMessage: "",
      modalStatus: "",
      redirectToTransactions: false,
      routeOptions: [],
      directionOptions: [],
      image: [],
      loading: false,
      image0: "",
      image1: "",
      image2: ""
    };
  }

  componentDidMount() {
    try {
      fetch(window.$url + "/dropdown?dropdownType=Route", {
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
            this.setState({ routeOptions: data });
          },
          error => {
            this.setState({ error: error });
          }
        );

      fetch(window.$url + "/dropdown?dropdownType=Direction", {
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
            this.setState({ directionOptions: data });
          },
          error => {
            this.setState({ error: error });
          }
        );
    } catch (e) {
      console.log("error", e);
    }
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleDirectionChange = e => {
    let value = JSON.parse(e.target.value);
    this.setState({ direction: value });
  };

  handleRouteChange = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(JSON.parse(options[i].value));
      }
    }
    this.setState({ routeArray: value });
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
      !this.state.stop_id
    ) {
      isValid = false;
      fieldErrors["stop_id"] =
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
    if (this.state.routeArray.length === 0) {
      isValid = false;
      fieldErrors["route"] = "Please select a route";
    }
    this.setState({ fieldErrors: fieldErrors });
    if (isValid) {
      this.postData();
    }
  };

  handleSubmit = async (files, allFiles) => {
    for (var i = 0; i < allFiles.length; i++) {
      const data = new FormData();
      data.append("file", allFiles[i].file);
      data.append("upload_preset", "nftafolder");
      this.setState({ loading: false });
      // Buffalo1#
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

  async postData() {
    let srbody = JSON.stringify({
      stop_id: this.state.stop_id,
      status: this.state.status,
      direction: JSON.parse(this.state.direction),
      location: this.state.location,
      request_type: this.state.request_type,
      reason: this.state.reason,
      route: this.state.routeArray,
      additional_information: this.state.additional_information,
      requested_user: this.state.requested_user,
      image0: this.state.image0,
      image1: this.state.image1,
      image2: this.state.image2
    });

    try {
      await fetch(window.$url + "/addServiceRequest", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + cookies.get("usertoken")
        },

        body: srbody
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
    this.showPopup();
  }

  showPopup() {
    this.modalButton.current.click();
  }

  closePopup = () => {
    if (this.state.modalStatus === "success") {
      this.setState({ redirectToTransactions: true });
    }
  };

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

    if (this.state.redirectToTransactions) {
      return <Redirect to="/requestStatus" />;
    }

    console.log("routeOptions", this.state.routeOptions);

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
                name="stop_id"
                value={this.state.stop_id}
                onChange={this.handleUserInput}
              />
              <span style={{ color: "red" }}>
                {this.state.fieldErrors["stop_id"]}
              </span>
            </div>
            <div className="col-md-4 mb-6">
              Direction
              <select
                className="col-md-12 mb-6 "
                name="direction"
                value={this.state.direction}
                onChange={this.handleUserInput}
              >
                <option></option>
                {this.state.directionOptions.map((direction, index) => (
                  <option key={index} value={JSON.stringify(direction)}>
                    {direction.display_name}
                  </option>
                ))}
              </select>
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
                onChange={this.handleUserInput}
              >
                <option></option>
                <option>New</option>
                <option>Repair</option>
                <option>Remove</option>
              </select>
              <span style={{ color: "red" }}>
                {this.state.fieldErrors["request_type"]}
              </span>
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
              <select
                multiple
                className="col-md-12 mb-6 "
                name="route"
                onChange={this.handleRouteChange}
              >
                {this.state.routeOptions.map((route, index) => (
                  <option key={index} value={JSON.stringify(route)}>
                    {route.display_name}
                  </option>
                ))}
              </select>
              <span style={{ color: "red" }}>
                {this.state.fieldErrors["route"]}
              </span>
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
          className="btn btn-primary"
          onClick={this.validateFields}
        >
          {" "}
          Submit{" "}
        </button>
        <input
          type="button"
          value="Button"
          hidden
          ref={this.modalButton}
          data-toggle="modal"
          data-target="#responseServiceRequest"
        />

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
