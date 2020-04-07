import React, { Component } from "react";
import FilterForm from "./FilterForm";
import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";

const cookies = new Cookies();
class TransactionInProgress extends Component {
  tempTrans = [];
  constructor() {
    super();
    this.state = {
      transactions: [],
      redirect: false
    };
  }

    handleOnClick = (e) => {
        let filterTransNo=e.transactionNo;
        let filterStopID=e.stopID;
        let filterDirection=e.direction;
        let filterCounty=e.county;
        let filterRequestID=e.requestID;

        let url = window.$url + "/transaction?status=In Progress&";
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
                    transactions: data
                });
            }
            )

    }

  componentDidMount() {
    fetch(window.$url + "/transaction?status=In Progress",{
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
        data => {
          this.tempTrans = data;
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
    }

  render() {
    const { transactions } = this.state;
    console.log(transactions);

    if(this.state.redirect){
      return <Redirect to={{
       pathname: '/',
       state: { status: '401' }
       }}/>
    }

    return (
      <div>
        <FilterForm handleOnClick={this.handleOnClick} />
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
                <td>
                  {trans.work_request ? trans.work_request.request_id : ""}
                </td>
                <td>
                  <a
                    href={`/transactionDetail/${trans.transaction_no}`}
                    exact
                    id="link"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

export default TransactionInProgress;
