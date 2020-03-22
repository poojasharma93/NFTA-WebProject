import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect,useParams} from 'react-router-dom';

class ServiceRequestDetail extends React.Component {
    constructor() {
        super();
        this.state={
            serviceRequest:[]
        };
    }

    componentDidMount(){
        let id=this.props.match.params.servReq;
        let url="http://localhost:8080/serviceRequest?id=" + id;
        console.log(url);
        fetch(url)
        .then(results => results.json())
        .then(
            (data) => {
                this.setState({ 
                    serviceRequest: data
                });
            },
            (error) => {
                this.setState({
                  error
                });
              }
            )
            
        console.log("state", this.state.serviceRequest);
    }

    render() {
        const{serviceRequest}=this.state;
       
        return(
            <div className="container">
                
                <h3 className="heading">Service Request Details</h3>

                <table className="tableService">
                <thead>
                        {serviceRequest.map(servReq => (
                        <tr key={servReq.request_id}>
                        <tr>
                        <td className="tdStyle">Request ID</td>
                        <td className="tdOtherStyle">{servReq.request_id}</td>
                        
                        <td className="tdStyle">Stop ID</td>
                        <td className="tdOtherStyle"> {servReq.stopId} </td>
                        </tr>
                        <tr>
                        <td className="tdStyle">Direction</td>
                        <td className="tdOtherStyle"> {servReq.direction} </td>
                        
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
                        <td className="tdOtherStyle"> {servReq.route}</td>
                        
                        <td className="tdStyle">Status</td>
                        <td className="tdOtherStyle"> {servReq.status}</td>
                        </tr>
                        <tr>
                        <td className="tdStyle">Admin User ID</td>
                        <td className="tdOtherStyle"> {servReq.admin_user_id}</td>
                       
                        <td className="tdStyle">Additional Information</td>
                        <td className="tdOtherStyle"> {servReq.additional_information}</td>
                        </tr>
                        
                        </tr>
                        ))}
                </thead>
            </table>
          
            </div>
        )
    }
}

export default ServiceRequestDetail;