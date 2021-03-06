import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class ServiceRequestDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      serviceRequest: [],
      redirect: false,
      redirectToHome: false
    };
  }

  componentDidMount() {
    let id = this.props.match.params.servReq;
    let url = window.$url + "/serviceRequest?id=" + id;
    console.log(url);
    fetch(url, {
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

  back = e => {
    this.setState({ redirectToHome: true });
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

    if (this.state.redirectToHome) {
      return <Redirect to="/requestStatus" />;
    }

    console.log(this.state.serviceRequest)
    const { serviceRequest } = this.state;

    return (
      <div class="container-fluid selector-for-some-widget">
        <h3 className="heading">Service Request Details</h3>
        {serviceRequest.map(servReq => (
          <form key={servReq.request_id} className="formDetail">
            <div class="row">
              <div class="col-md-3 mb-6">
                <label for="validationDefault01">Request ID</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault01"
                  value={servReq.request_id}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">Stop ID</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={servReq.stop_id}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">Direction</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={
                    servReq.direction ? servReq.direction.display_name : ""
                  }
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">Location</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={servReq.location}
                  disabled={true}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">Request Type</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={servReq.request_type}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">Reason</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={servReq.reason}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">Status</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={servReq.status}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">Admin User</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={servReq.requested_user}
                  disabled={true}
                />
              </div>
            </div>
            <hr class="dotted"></hr>
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
                  disabled={true}
                ></textarea>
              </div>
              <div class="form-group col-md-6 mb-6  ">
                  <table className="table table-sm table-bordered w-auto mt-2">
                    <thead>
                      <tr>
                        <th scope="col" class="w-25">
                          Route ID
                        </th>
                        <th scope="col" class="w-30">
                          Route Info
                        </th>
                      </tr>
                      {servReq.route
                        ? servReq.route.map(route => (
                            <tr key={route.dropdown_id}>
                              <td> {route.dropdown_id} </td>
                              <td> {route.display_name}</td>
                            </tr>
                          ))
                        : ""}
                    </thead>
                  </table>
                </div>
            </div>

            <div class="row">
              <div class="col-md-4 mb-6 ">
                {servReq.image0 ? (
                  <a class="lightbox " href="#dog">
                    <img
                      src={servReq.image0}
                      class="thumbnail float-left"
                      alt="No preview"
                    />
                  </a>
                ) : (
                  <h1></h1>
                )}
                <div
                  class="lightbox-target container-fluid selector-for-some-widget"
                  id="dog"
                >
                  <img src={servReq.image0} alt="No preview" />
                  <a class="lightbox-close" href="#"></a>
                </div>
              </div>

              <div class="col-md-4 mb-6 ">
                {servReq.image1 ? (
                  <a class="lightbox " href="#dog">
                    <img
                      src={servReq.image1}
                      class="thumbnail float-left"
                      alt="No preview"
                    />
                  </a>
                ) : (
                  <h1></h1>
                )}
                <div
                  class="lightbox-target container-fluid selector-for-some-widget"
                  id="dog"
                >
                  <img src={servReq.image1} alt="No preview" />
                  <a class="lightbox-close" href="#"></a>
                </div>
              </div>
              <div class="col-md-4 mb-6 ">
                {servReq.image2 ? (
                  <a class="lightbox " href="#dog">
                    <img
                      src={servReq.image2}
                      class="thumbnail float-left"
                      alt="No preview"
                    />
                  </a>
                ) : (
                  <h1></h1>
                )}
                <div
                  class="lightbox-target container-fluid selector-for-some-widget"
                  id="dog"
                >
                  <img src={servReq.image2} alt="No preview" />
                  <a class="lightbox-close" href="#"></a>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary col-md-1"
              onClick={this.back}
            >
              {" "}
              Back{" "}
            </button>
          </form>
        ))}
      </div>
    );
  }
}

export default ServiceRequestDetail;
