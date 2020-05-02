import React, { Component } from "react";
import Cookies from "universal-cookie";
import FilterFormServReq from "./FilterFormServReq";
import { Redirect, withRouter } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import filterFactory, {
  textFilter,
  dateFilter,
  Comparator,
  selectFilter
} from "react-bootstrap-table2-filter";
import "moment-timezone";

// import { date } from "yup";

const cookies = new Cookies();

class OpenServiceRequest extends Component {
  constructor() {
    super();
    this.state = {
      serviceRequests: [],
      filterServiceReq: [],
      error: "",
      redirect: false
    };
  }

  handleOnClick = e => {
    console.log(e.requestID);
    console.log(e.stopID);
    let filterRequestID = e.requestID;
    let filterStopID = e.stopID;
    let filterDirection = e.direction;
    let filterRequestType = e.requestType;
    let filterRequestUser = e.requestUser;
    let url = window.$url + "/serviceRequest?status=Open&";
    console.log(
      filterRequestID,
      filterStopID,
      filterDirection,
      filterRequestType,
      filterRequestUser
    );

    if (filterRequestID !== "") {
      url = url + "id=" + filterRequestID + "&";
    }
    if (filterStopID !== "") {
      url = url + "stopID=" + filterStopID + "&";
    }
    if (filterDirection !== "") {
      url = url + "direction=" + filterDirection + "&";
    }
    if (filterRequestType !== "") {
      url = url + "type=" + filterRequestType + "&";
    }
    if (filterRequestUser !== "") {
      url = url + "requestedUser=" + filterRequestUser;
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
          serviceRequests: data
        });
      });

    console.log(this.state.serviceRequests);
  };

  componentDidMount() {
    try {
      fetch(window.$url + "/serviceRequest?status=Open", {
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
            console.log("Data", data);
            this.setState({
              serviceRequests: data
            });
          },
          error => {
            this.setState({
              error: error
            });
          }
        );
    } catch (e) {
      console.log("error", e);
    }
  }

  request_id;
  stopidFilter;
  directionFilter;
  request_type;
  requested_user;
  create_date_time;

  handleClick = () => {
    this.request_id("");
    this.stopidFilter("");
    this.directionFilter("");
    this.request_type("");
    this.requested_user("");
    this.create_date_time("");
  };

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

  defaultSorted = [
    {
      dataField: "request_id",
      order: "desc"
    }
  ];

  columns = [
    {
      dataField: "stop_id",
      text: "StopID",
      sort: true,
      filter: textFilter({
        placeholder: "Stop ID",
        getFilter: filter => {
          this.stopidFilter = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "request_id",
      text: "Request ID",
      id: "request_id",
      sort: true,
      filter: textFilter({
        placeholder: "Req ID",
        getFilter: filter => {
          this.request_id = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "direction.display_name",
      text: "Direction",
      sort: true,
      filter: textFilter({
        placeholder: "Direction",
        getFilter: filter => {
          this.directionFilter = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "request_type",
      text: "Request Type",
      sort: true,
      filter: textFilter({
        placeholder: "Req Type",
        getFilter: filter => {
          this.request_type = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "requested_user",
      text: "Admin User",
      sort: true,
      filter: textFilter({
        placeholder: "Admin User",
        getFilter: filter => {
          this.requested_user = filter;
        }
      }),
      sortCaret: this.caret
    },
    {
      dataField: "create_date_time",
      text: "Request Date",
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
            <a href={"/serviceRequestDetail/" + row.request_id}>View Details</a>
          </p>
        );
      },
      sort: false,
      style: { color: "blue" }
    }
  ];

  render() {
    const { serviceRequests } = this.state;

    // console.log(this.props);
    console.log(serviceRequests);

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
      <div class="container-fluid">
        {/* <FilterFormServReq handleOnClick={this.handleOnClick} /> */}
        <hr />
        <button className="btn btn-lg btn-primary" onClick={this.handleClick}>
          Clear all filters
        </button>
        <BootstrapTable
          classes="container-fluid w-100 p-3"
          keyField="request_id"
          data={serviceRequests}
          columns={this.columns}
          hover="true"
          filter={filterFactory()}
          filterPosition="top"
          defaultSorted={this.defaultSorted}
          pagination={paginationFactory({
            sizePerPage: 10,
            hideSizePerPage: true,
            showTotal: true,
            withFirstAndLast: true,
            alwaysShowAllBtns: true
          })}
        />
        <div class="mb-5"></div>
      </div>
    );
  }
}

export default OpenServiceRequest;
