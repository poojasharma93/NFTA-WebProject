import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  useLocation
} from "react-router-dom";
import FilterFormServReq from "./FilterFormServReq";

class OpenServiceRequest extends Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    fetch(window.$url + "/transactions")
      .then(results => results.json())
      .then(
        data => {
          this.setState({
            transactions: data
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );

    //console.log("state", this.state.transactions);
  }

  render() {
    const { transactions } = this.state;
    console.log(this.props);

    return (
      <div>
        <FilterFormServReq />

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
                <td> {trans.request_id}</td>
                <td>
                  {" "}
                  <a
                    href={`/transactionDetail/${trans.transaction_no}`}
                    id="link"
                  >
                    View Details
                  </a>{" "}
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

export default OpenServiceRequest;
