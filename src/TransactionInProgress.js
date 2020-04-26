import React, { Component } from "react";
import FilterForm from "./FilterForm";
import Cookies from "universal-cookie";
import { Redirect, Route, Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

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

  handleOnClick = e => {
    let filterTransNo = e.transactionNo;
    let filterStopID = e.stopID;
    let filterDirection = e.direction;
    let filterCounty = e.county;
    let filterRequestID = e.requestID;

    let url = window.$url + "/transaction?status=In Progress&";
    console.log(filterRequestID, filterStopID, filterDirection);

    if (filterTransNo !== "") {
      url = url + "transaction_no=" + filterTransNo + "&";
    }
    if (filterStopID !== "") {
      url = url + "id=" + filterStopID + "&";
    }
    if (filterDirection !== "") {
      url = url + "direction=" + filterDirection + "&";
    }
    if (filterCounty !== "") {
      url = url + "country=" + filterCounty + "&";
    }
    if (filterRequestID !== "") {
      url = url + "requestID=" + filterRequestID;
    }

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
      .then(data => {
        this.setState({
          transactions: data
        });
      });
  };

  componentDidMount() {
    fetch(window.$url + "/transaction?status=In Progress", {
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
          this.tempTrans = data;
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
  }
  transactionFilter;
  stopidFilter;
  directionFilter;
  countyFilter;
  requestFilter;
  caret = (order, column) => {
    if (!order) return <span>&nbsp;&nbsp;Desc/Asc</span>;
    else if (order === "asc")
      return (
        <span>
          &nbsp;&nbsp;Desc/<font color="red">Asc</font>
        </span>
      );
    else if (order === "desc")
      return (
        <span>
          &nbsp;&nbsp;<font color="red">Desc</font>/Asc
        </span>
      );
    return null;
  };

  columns = [
    {
      dataField: "transaction_no",
      text: "TransactionID",
      id: "transaction_no",
      sort: true,
      filter: textFilter({
        getFilter: filter => {
          this.transactionFilter = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "stop_id",
      text: "StopID",
      sort: true,
      filter: textFilter({
        getFilter: filter => {
          this.stopidFilter = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "direction.display_name",
      text: "Direction",
      sort: true,
      filter: textFilter({
        getFilter: filter => {
          this.directionFilter = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "county.display_name",
      text: "County",
      sort: true,
      filter: textFilter({
        getFilter: filter => {
          this.countyFilter = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "work_request.request_id",
      text: "Request ID",
      sort: true,
      filter: textFilter({
        getFilter: filter => {
          this.requestFilter = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "transaction_no",
      formatter: (cell, row) => {
        return (
          <p>
            <a href={"/requestStatusDetail/" + row.transaction_no}>
              View Details
            </a>
          </p>
        );
      },
      text: "View Details",
      sort: false,
      style: { color: "blue" }
    }
  ];

  handleClick = () => {
    this.transactionFilter("");
    this.stopidFilter("");
    this.directionFilter("");
    this.countyFilter("");
    this.requestFilter("");
  };

  render() {
    const { transactions } = this.state;
    console.log(transactions);

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

    return (
      <div>
        <FilterForm handleOnClick={this.handleOnClick} />
        {/* <table id="inprogress" className="table" data-silent-sort="false">
          <thead>
            <tr>
              <th scope="col">TransactionID</th>
              <th scope="col" data-sortable="true">
                StopID
              </th>
              <th scope="col">Direction</th>
              <th scope="col">County</th>
              <th scope="col">Request ID</th>
              <th></th>
            </tr>
            {transactions.map(trans => (
              <tr key={trans.transaction_no}>
                <td> {trans.transaction_no} </td>
                <td> {trans.stop_id}</td>
                <td>{trans.direction ? trans.direction.display_name : ""}</td>
                <td>{trans.county ? trans.county.display_name : ""}</td>
                <td>
                  {trans.work_request ? trans.work_request.request_id : ""}
                </td>
                <td>
                  <a
                    href={`/requestStatusDetail/${trans.transaction_no}`}
                    exact
                    id="link"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </thead>
        </table> */}
        <hr />
        <button className="btn btn-lg btn-primary" onClick={this.handleClick}>
          {" "}
          Clear all filters{" "}
        </button>
        <BootstrapTable
          keyField="transaction_no"
          data={transactions}
          columns={this.columns}
          hover="true"
          filter={filterFactory()}
          pagination={paginationFactory({
            sizePerPage: 10,
            hideSizePerPage: true,
            showTotal: true,
            withFirstAndLast: true,
            alwaysShowAllBtns: true
          })}
        />
        {/* <ToolkitProvider
          keyField="transaction_no"
          data={transactions}
          columns={this.columns}
          columnToggle
        >
          {props => (
            <div>
              <ToggleList {...props.columnToggleProps} />
              <hr />
              <BootstrapTable
                {...props.baseProps}
                filter={filterFactory()}
                hover="true"
                pagination={paginationFactory({
                  sizePerPage: 10,
                  hideSizePerPage: true,
                  showTotal: true,
                  withFirstAndLast: true,
                  alwaysShowAllBtns: true
                })}
              />
            </div>
          )}
        </ToolkitProvider> */}
      </div>
    );
  }
}

export default TransactionInProgress;
