import React, { Component } from "react";
import FilterForm from "./FilterForm";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import filterFactory, { dateFilter, textFilter } from "react-bootstrap-table2-filter";

const cookies = new Cookies();
class TransactionResolved extends Component {
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

    let url = window.$url + "/transaction?status=Resolved&";
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
    fetch(window.$url + "/transaction?status=Resolved", {
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
  create_date_time;
  request_date_time;
  deviceFilter;
  caret = (order, column) => {
    if (!order) return <span>&nbsp;&nbsp;↑/↓</span>;
    else if (order === "asc")
      return (
        <span>
          &nbsp;&nbsp;↑/<font color="red">↓</font>
        </span>
      );
    else if (order === "desc")
      return (
        <span>
          &nbsp;&nbsp;<font color="red">↑</font>/↓
        </span>
      );
    return null;
  };

  columns = [
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
      dataField: "deviceName",
      text: "Device ID",
      sort: true,
      filter: textFilter({
        getFilter: filter => {
          this.deviceFilter = filter;
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
      dataField: "work_request.create_date_time",
      text: "Request Date",
      sort: true,
      filter: dateFilter({
        withoutEmptyComparatorOption: true,
        style: { display: "flex", width: 250 },
        dateClassName: "custom-date-class",
        dateStyle: { backgroundColor: "white", margin: "0px" },
        getFilter: filter => {
          this.request_date_time = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "create_date_time",
      text: "Date",
      sort: true,
      filter: dateFilter({
        withoutEmptyComparatorOption: true,
        style: { display: "flex", width: 250 },
        dateClassName: "custom-date-class",
        dateStyle: { backgroundColor: "white", margin: "0px" },
        getFilter: filter => {
          this.create_date_time = filter;
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
    this.create_date_time("");
    this.request_date_time("");
    this.deviceFilter("");
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

    const { transactions } = this.state;
    console.log(transactions);
    return (
      <div>
        {/*<FilterForm handleOnClick={this.handleOnClick} />*/}

        <hr />
        <button
          className="btn btn-lg btn-primary align-bottom"
          onClick={this.handleClick}
        >
          {/* {" "} */}
          Clear all filters
          {/* {" "} */}
        </button>
        <BootstrapTable
          classes="container-fluid w-100 p-3"
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
      </div>
    );
  }
}

export default TransactionResolved;
