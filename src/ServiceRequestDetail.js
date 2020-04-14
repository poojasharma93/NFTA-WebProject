import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class ServiceRequestDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      serviceRequest: [],
      redirect: false
    };
  }

  componentDidMount() {
    let id = this.props.match.params.servReq;
    let url = window.$url+"/serviceRequest?id=" + id;
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
    const { serviceRequest } = this.state;

    return (
      <div className="container-fluid">
        <h3 className="heading">Service Request Details</h3>

                <table className="tableService">
                <thead>
                    {serviceRequest.map(servReq => (
                    <tr key={servReq.request_id}>
                    <tr>
                    <td className="tdStyle">Request ID</td>
                    <td className="tdOtherStyle">{servReq.request_id}</td>
                    
                    <td className="tdStyle">Stop ID</td>
                    <td className="tdOtherStyle"> {servReq.stop_id} </td>
                    </tr>
                    <tr>
                    <td className="tdStyle">Direction</td>
                    <td className="tdOtherStyle"> {servReq.direction? servReq.direction.display_name: ""} </td>
                    
                    <td className="tdStyle">Location</td>
                    <td className="tdOtherStyle"> {servReq.location}</td>
                    </tr>
                    <tr>
                    <td className="tdStyle">Request Type</td>
                    <td className="tdOtherStyle"> {servReq.request_type}</td>
                    
                    <td className="tdStyle">Reason</td>
                    <td className="tdOtherStyle"> {servReq.reason}</td>
                    </tr>
                    <tr>
                    <td className="tdStyle">Route</td>
                    
                    <td className="tdOtherStyle">{servReq.route.map(function(r,i){ return <td key={i}>{r.display_name}</td>})}</td>
                    
                    <td className="tdStyle">Status</td>
                    <td className="tdOtherStyle"> {servReq.status}</td>
                    </tr>
                    <tr>
                    <td className="tdStyle">Admin User</td>
                    <td className="tdOtherStyle"> {servReq.requested_user}</td>
                    
                    <td className="tdStyle">Additional Information</td>
                    <td className="tdOtherStyle"> {servReq.additional_information}</td>
                    </tr>

                    <tr>
                    <td>
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
                    </td>
                    <td>
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
                    </td>
                    <td>
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
                    </td>
                    </tr>
                </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }

}

export default ServiceRequestDetail;
