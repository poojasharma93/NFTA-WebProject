import React, { Component } from "react";
import Cookies from 'universal-cookie';
import FilterFormServReq from "./FilterFormServReq";
import { Redirect, withRouter } from "react-router-dom";

const cookies = new Cookies();
class OpenServiceRequest extends Component{
    
    constructor() {
        super();
        this.state={
            serviceRequests:[],
            filterServiceReq:[],
            error:'',
            redirect: false
        };
    }

    handleOnClick = (e) => {
        console.log(e.requestID);
        console.log(e.stopID);
        let filterRequestID=e.requestID;
        let filterStopID=e.stopID;
        let filterDirection=e.direction;
        let filterRequestType=e.requestType;
        let filterRequestUser=e.requestUser;
        let url = window.$url + "/serviceRequest?status=Open&";
        console.log(filterRequestID, filterStopID, filterDirection, filterRequestType, filterRequestUser);
        
        if(filterRequestID!==""){
            url=url+"id=" + filterRequestID + "&";
        }
        if(filterStopID!==""){
            url=url+"stopID="+filterStopID + "&";
        }
        if(filterDirection!==""){
            url=url+"direction="+filterDirection + "&";
        }
        if(filterRequestType!==""){
            url=url+"type="+filterRequestType + "&";
        }
        if(filterRequestUser!==""){
            url=url+"requestedUser="+filterRequestUser;
        }

        fetch(url, {
            headers: {
              "Authorization": "Bearer "+ cookies.get('usertoken')
            }})
        .then(results => {
            if(results.status===401)
            {
                this.setState({redirect:true});
            }
            else{
                return results.json();
            }
        })
        .then(
            (data) => {
                this.setState({ 
                    serviceRequests: data
                });
            }
            )

        console.log(this.state.serviceRequests);
    }

    componentDidMount(){
        try{
        fetch(window.$url + "/serviceRequest?status=Open", {headers: {
            "Authorization": "Bearer "+cookies.get('usertoken')
          }})
        .then(results => {
            if(results.status===401)
            {
                this.setState({redirect:true});
            }
            else{
                return results.json();
            }
        })
        .then(
            (data) => {
                console.log("Data", data)
                this.setState({ 
                    serviceRequests: data
                });
            },
            (error) => {
                this.setState({
                  error: error
                });
              }
            )
        }
        catch(e){
            console.log("error",e)
        }
    }
        
    render(){
        const {serviceRequests} = this.state;
        console.log(this.props);
        console.log(serviceRequests);

        if(this.state.redirect){
           return <Redirect to={{
            pathname: '/',
            state: { status: '401' }
        }}/>
            
        }
        
        return(
            <div>
                <FilterFormServReq handleOnClick={this.handleOnClick}/>
                
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Request ID</th>
                        <th scope="col">StopID</th>
                        <th scope="col">Direction</th>
                        <th scope="col">Request Type</th>
                        <th scope="col">Admin User</th>
                        <th></th>
                    </tr>
                        {serviceRequests.map(servReq => (
                        <tr key={servReq.request_id}>
                        <td> {servReq.request_id} </td>
                        <td> {servReq.stopId}</td>
                        <td> {servReq.direction}</td>
                        <td> {servReq.request_type}</td>
                        <td> {servReq.requested_user}</td>
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
