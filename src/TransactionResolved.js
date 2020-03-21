import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect, useLocation} from 'react-router-dom';
import FilterForm from './FilterForm';

class TransactionResolved extends Component{
    tempTrans=[]
    constructor() {
        super();
        this.state={
            transactions:[]
        };
    }

    handleOnClick = (e) => {
        console.log(e.transactionNo);
        console.log(e.stopID);
        let filterTransNo=e.transactionNo;
        let filterStopID=e.stopID;
        let filterDirection=e.direction;
        let filterCounty=e.county;
        let filterRequestID=e.requestID;
        console.log(filterTransNo, filterStopID, filterDirection, filterCounty, filterRequestID);
        
        let filterArray = this.tempTrans;
        console.log(filterArray);
        if(filterTransNo!==""){
            filterArray=filterArray.filter((d) => {
                let searchVal = d.transaction_no + "";
                return searchVal.indexOf(filterTransNo) !== -1;
            });
        }
        if(filterStopID!==""){
            filterArray=filterArray.filter((d) => {
                let searchVal = d.stop_id + "";
                return searchVal.indexOf(filterStopID) !== -1;
            });
        }
        if(filterDirection!==""){
            filterArray=filterArray.filter((d) => (d.direction.indexOf(filterDirection) !== -1));
        }
        if(filterCounty!==""){
            filterArray=filterArray.filter((d) => (d.county.indexOf(filterCounty) !== -1));
        }
        if(filterRequestID!==""){
            filterArray=filterArray.filter((d) => {
                let searchVal = (d.work_request?d.work_request.request_id:"") + "";
                return searchVal.indexOf(filterRequestID) !== -1;
            });
        }
        console.log(filterArray); 
        this.setState({
            transactions: filterArray
        })
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