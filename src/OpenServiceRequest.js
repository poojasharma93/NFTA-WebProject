import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect, useLocation} from 'react-router-dom';
import FilterFormServReq from './FilterFormServReq';


class OpenServiceRequest extends Component{
    constructor() {
        super();
        this.state={
            serviceRequests:[]
        };
    }

    componentDidMount(){
        
        fetch('http://localhost:8080/serviceRequests')
        .then(results => results.json())
        .then(
            (data) => {
                this.setState({ 
                    serviceRequests: data
                });
            },
            (error) => {
                this.setState({
                  error
                });
              }
            )
            
        //console.log("state", this.state.transactions);
    }
        

    render(){
        const {serviceRequests} = this.state;
        
        return(
            <div>
                <FilterFormServReq/>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Request ID</th>
                        <th scope="col">Stop ID</th>
                        <th scope="col">Direction</th>
                        <th scope="col">Request Type</th>
                        <th scope="col">Admin User</th>
                        <th scope="col"></th>
                        <th></th>
                    </tr>
                        {serviceRequests.map(servReq => (
                        <tr key={servReq.request_id}>
                        <td> {servReq.request_id}</td>
                        <td> {servReq.stopId} </td>
                        <td> {servReq.direction} </td>
                        <td> {servReq.request_type}</td>
                        <td> {servReq.admin_user_id}</td>
                        <td> <a href={`/serviceRequestDetail/${servReq.request_id}`} id="link">View Details</a> </td>
                        </tr>
                        ))}
                </thead>
            </table>

          
            </div>
            
            
            
        );
    }
}

export default OpenServiceRequest;