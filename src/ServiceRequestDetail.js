import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  useParams
} from "react-router-dom";

class ServiceRequestDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      serviceRequest: []
    };
  }

  componentDidMount() {
    let id = this.props.match.params.servReq;
    let url = window.$url + "/serviceRequest?id=" + id;
    console.log(url);
    fetch(url)
      .then(results => results.json())
      .then(
        data => {
          this.setState({
            serviceRequest: data
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );

    console.log("state", this.state.serviceRequest);
  }

  render() {
    const { serviceRequest } = this.state;

    return (
      <div class="container-fluid selector-for-some-widget">
        <h3 className="heading">Service Request Details</h3>

        {serviceRequest.map(servReq => (
          <form key={servReq.request_id} className="formDetail">
            <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">Request ID</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value={servReq.request_id}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">Stop ID</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={servReq.stopId}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">Direction</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={servReq.direction}
                />
              </div>
            </div>
            {/*street_on,nearest_cross_street,position
             */}
            <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">Location</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value={servReq.location}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">Request Type</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={servReq.request_type}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">Reason</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={servReq.reason}
                />
              </div>
            </div>
            {/* 	fastened_to,location,county
             */}
            <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">Route</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value="."
                  value={servReq.route}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">Status</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value="."
                  value={servReq.status}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">Admin User ID</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value="."
                  value={servReq.admin_user_id}
                />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6 mb-6">
                <label for="exampleFormControlTextarea1">
                  Additional Information
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={servReq.additional_information}
                ></textarea>
              </div>
            </div>
          </form>
        ))}
      </div>
    );
  }
}

export default ServiceRequestDetail;
