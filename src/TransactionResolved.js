import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect, useLocation} from 'react-router-dom';
import FilterForm from './FilterForm';

class TransactionResolved extends Component{
    constructor() {
        super();
        this.state={
            transactions:[]
        };
    }

    handleOnClick = (e) => {
        let filterTransNo=e.transactionNo;
        let filterStopID=e.stopID;
        let filterDirection=e.direction;
        let filterCounty=e.county;
        let filterRequestID=e.requestID;

        let url = "http://localhost:8080/transaction?status=Resolved&";
        console.log(filterRequestID, filterStopID, filterDirection);
        
        if(filterTransNo!==""){
            url=url+"transaction_no=" + filterTransNo + "&";
        }
        if(filterStopID!==""){
            url=url+"id="+filterStopID + "&";
        }
        if(filterDirection!==""){
            url=url+"direction="+filterDirection + "&";
        }
        if(filterCounty!==""){
            url=url+"country="+filterCounty + "&";
        }
        if(filterRequestID!==""){
            url=url+"requestID="+filterRequestID;
        }

        fetch(url)
        .then(results => results.json())
        .then(
            (data) => {
                this.setState({ 
                    transactions: data
                });
            }
            )
    }
    
    componentDidMount(){
        
        fetch('http://localhost:8080/transaction?status=Resolved')
        .then(results => results.json())
        .then(
            (data) => {
                this.tempTrans=data;
                this.setState({ 
                    transactions: data
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
        const {transactions} = this.state;
        

        return(
            <div>
            <FilterForm handleOnClick={this.handleOnClick}/>
            
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">TransactionID</th>
                        <th scope="col">StopID</th>
                        <th scope="col">Direction</th>
                        <th scope="col">County</th>
                        <th scope="col">Request ID</th>
                        <th></th>
                    </tr>
                        {transactions.map(trans => (
                        <tr key={trans.transaction_no}>
                        <td> {trans.transaction_no} </td>
                        <td> {trans.stop_id}</td>
                        <td> {trans.direction}</td>
                        <td> {trans.county}</td>
                        <td> {trans.work_request?trans.work_request.request_id:""} </td>
                        <td> <a href={`/transactionDetail/${trans.transaction_no}`} id="link">View Details</a> </td>
                        </tr>
                        ))}
                </thead>
            </table>

          
            </div>
            
            
            
        );
    }
}

export default TransactionResolved;