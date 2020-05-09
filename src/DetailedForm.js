import React from "react";
import Iframe from "react-iframe";
import { formPost } from "./formPost";
import Cookies from "universal-cookie";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./App.css";
const cookies = new Cookies();

class detailedForm extends React.Component {
  constructor(props) {
    super(props);

    const value = props.details.map(trans => {
      return trans.transaction_no;
    });

    props.details.map(trans => {
      return trans.transaction_no;
    });
    this.state = {
      transaction_no: "",
      stopID: "",
      direction: "",
      county: "",
      requestID: "",
      status: "",
      admin_comments: ""
    };
  }
  async postData() {
    try {
      console.log(this.props.details[0]["transaction_no"]);
      this.props.details[0]["username"] = cookies.get("username");
      console.log(this.props.details[0]);
      const result = await fetch(window.$url + "/updateTransaction", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + cookies.get("usertoken")
        },

        body: JSON.stringify({
          transaction_no: this.props.details[0]["transaction_no"],
          stop_id: this.props.details[0]["stop_id"],
          status: this.props.details[0]["status"],
          admin_comments: this.props.details[0]["admin_comments"],
          username: this.props.details[0]["username"]
        })
      });
      Alert.success("CHANGES SAVED", {
        position: "top-right",
        effect: "slide",
        offset: 100
      });
    } catch (e) {
      console.log(e);
      Alert.error("Error Changes not saved", {
        position: "top-right",
        effect: "slide",
        offset: 100
      });
    }
  }

  handleAdminComments = e => {
    this.props.details[0]["admin_comments"] = e.target.value;
  };

  handleStatusChange = e => {
    this.props.details[0]["status"] = e.target.value;
  };

  // currently not in use
  handleSubmit(e) {
    e.preventDefault();
    formPost(this.state);
  }

  render() {
    return (
      <div class="container-fluid selector-for-some-widget">
        <h3 className="heading">Transaction Details</h3>
        {this.props.details.map(trans => (
          <form key={trans.transaction_no} className="formDetail">
            <div class="row">
              <div class="col-md-3 mb-6">
                <label for="validationDefault01">transaction_no</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault01"
                  value={trans.transaction_no}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">stop_id</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={trans.stop_id}
                  disabled={true}
                />
              </div>

              <div class="col-md-3 mb-6">
                <label for="validationDefault02">request_id</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={
                    trans.work_request ? trans.work_request.request_id : ""
                  }
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault01">Last Updated By</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault01"
                  value={trans.username}
                  disabled={true}
                />
              </div>
            </div>
            {/*street_on,nearest_cross_street,position
             */}
            <hr class="dotted"></hr>
            <div class="row">
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">Device Name</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={trans.deviceName}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault01">street_on</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault01"
                  value={trans.street_on}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">nearest_cross_street</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={trans.nearest_cross_street}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">position</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={trans.position ? trans.position.display_name : ""}
                  disabled={true}
                />
              </div>
            </div>
            {/* 	fastened_to,location,county
             */}
            <hr class="dotted"></hr>
            <div class="row">
              <div class="col-md-3 mb-6">
                <label for="validationDefault01">fastened_to</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault01"
                  value="."
                  value={
                    trans.fastened_to ? trans.fastened_to.display_name : ""
                  }
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">location</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={trans.location}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">county</label>
                <input
                  type="text text-dark"
                  class="form-control input-group-text-left text-light bg-dark "
                  id="validationDefault02"
                  value={trans.county ? trans.county.display_name : ""}
                  disabled={true}
                />
              </div>
              <div class="col-md-3 mb-6">
                <label for="validationDefault02">direction</label>
                <input
                  type="text"
                  class="form-control text-light bg-dark"
                  id="validationDefault02"
                  value={trans.direction ? trans.direction.display_name : ""}
                  disabled={true}
                />
              </div>
            </div>
            {/* test */}
            <hr class="dotted"></hr>
            <div class="container-fluid">
              <div class="row justify-content-center">
                <div class="col-md-1 mb-6 ml-md-auto">
                  <label>
                    Advertisement
                    <BootstrapSwitchButton
                      checked={trans.advertisement}
                      onlabel="Yes"
                      onstyle="success"
                      offlabel="No"
                      offstyle="danger"
                      disabled={true}
                      style="w-15 mx-2"
                    />
                  </label>
                </div>
                <div class="col-md-1 mb-6 ml-md-auto">
                  <label>
                    Shelter
                    <BootstrapSwitchButton
                      checked={trans.shelter}
                      onlabel="Yes"
                      onstyle="success"
                      offlabel="N0"
                      offstyle="danger"
                      disabled={true}
                      style="w-15 mx-3"
                    />
                  </label>
                </div>
                <div class="col-md-1 mb-6 ml-md-auto">
                  <label>
                    Bench
                    <BootstrapSwitchButton
                      checked={trans.bench}
                      onlabel="Yes"
                      onstyle="success"
                      offlabel="N0"
                      offstyle="danger"
                      disabled={true}
                      style="w-15 mx-3"
                    />
                  </label>
                </div>
                <div class="col-md-1 mb-6 ml-md-auto">
                  <label>
                    Bike Rack
                    <BootstrapSwitchButton
                      checked={trans.bike_rack}
                      onlabel="Yes"
                      onstyle="success"
                      offlabel="N0"
                      offstyle="danger"
                      disabled={true}
                      style="w-15 mx-3"
                    />
                  </label>
                </div>
                <div class="col-md-1 mb-6 ml-md-auto">
                  <label>
                    Trash Can
                    <BootstrapSwitchButton
                      checked={trans.trash_can}
                      onlabel="Yes"
                      onstyle="success"
                      offlabel="N0"
                      offstyle="danger"
                      disabled={true}
                      style="w-15 mx-3"
                    />
                  </label>
                </div>
                <div class="col-md-1 mb-6 ml-md-auto">
                  <label>
                    Time Table
                    <BootstrapSwitchButton
                      checked={trans.time_table}
                      onlabel="Yes"
                      data-on="Yes"
                      onstyle="success"
                      offlabel="N0"
                      data-off="No"
                      offstyle="danger"
                      disabled={true}
                      style="w-15 mx-3"
                    />
                  </label>
                </div>
                <div class="col-md-1 mb-6 ml-md-auto">
                  <label>
                    System Map
                    <BootstrapSwitchButton
                      checked={trans.system_map}
                      onlabel="Yes"
                      onstyle="success"
                      offlabel="N0"
                      offstyle="danger"
                      disabled={true}
                      style="w-15 mx-3"
                    />
                  </label>
                </div>
              </div>
            </div>
            {/* {/* status,shelter,advertisement
             */}
            {/* <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">status</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value={trans.status}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">shelter</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.shelter}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">advertisement</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.advertisement}
                />
              </div>
            </div> */}
            {/* bench,bike_rack,trash_can
             */}
            {/* <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">bench</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value={trans.bench}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">bike_rack</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.bike_rack}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">trash_can</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.trash_can}
                />
              </div>
            </div> */}
            {/* time_table,system_map,work_request
             */}
            {/* <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">time_table</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value={trans.time_table}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">system_map</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.system_map}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">request_id</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.request_id}
                />
              </div>
            </div> */}
            {/* user_id,device_id,
             */}
            {/* <div class="row">
              <div class="col-md-6 mb-6">
                <label for="validationDefault01">Last User</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value={trans.username}
                />
              </div>
              <div class="col-md-6 mb-6">
                <label for="validationDefault02">device_id</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.device_id}
                />
              </div>
            </div> */}
            {/* additional_information,admin_comments
             */}
            <hr class="dotted"></hr>
            <div class="container-fluid">
              <div class="row">
                <div class="form-group col-md-6 mb-6">
                  <label for="exampleFormControlTextarea1">
                    additional_information
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    value={trans.additional_information}
                    disabled={true}
                  ></textarea>
                </div>

                <div class="form-group col-md-6 mb-6  ">
                  <table className="table table-sm table-bordered w-auto mt-2">
                    <thead>
                      <tr>
                        <th scope="col" class="w-25">
                          Route ID
                        </th>
                        <th scope="col" class="w-30">
                          Route Info
                        </th>
                      </tr>
                      {trans.routes
                        ? trans.routes.map(rot => (
                            <tr key={rot.dropdown_id}>
                              <td> {rot.dropdown_id} </td>
                              <td> {rot.display_name}</td>
                            </tr>
                          ))
                        : ""}
                    </thead>
                  </table>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 mb-6 ">
                {trans.image0 ? (
                  <a class="lightbox " href="#dog">
                    <img
                      src={trans.image0}
                      class="thumbnail float-left"
                      alt="No preview"
                    />
                  </a>
                ) : (
                  <h1></h1>
                )}
                <div
                  class="lightbox-target container-fluid selector-for-some-widget"
                  id="dog"
                >
                  <img src={trans.image0} alt="No preview" />
                  <a class="lightbox-close" href="#"></a>
                </div>
              </div>

              <div class=" col-md-4 mb-6  ">
                {trans.image1 ? (
                  <a class="lightbox " href="#dog">
                    <img
                      src={trans.image1}
                      class="thumbnail float-middle"
                      alt="No preview"
                    />
                  </a>
                ) : (
                  <h1></h1>
                )}
                <div
                  class="lightbox-target container-fluid selector-for-some-widget"
                  id="dog"
                >
                  <img src={trans.image1} alt="No preview" />
                  <a class="lightbox-close" href="#"></a>
                </div>
              </div>

              <div class=" col-md-4 mb-6  ">
                {trans.image2 ? (
                  <a class="lightbox " href="#dog">
                    <img
                      src={trans.image2}
                      class="thumbnail float-right"
                      alt="No preview"
                    />
                  </a>
                ) : (
                  <h1></h1>
                )}
                <div
                  class="lightbox-target container-fluid selector-for-some-widge"
                  id="dog"
                >
                  <img src={trans.image2} alt="No preview" />
                  <a class="lightbox-close" href="#"></a>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div class="row">
              <div align="center" class="col-md-12 maps  ">
                <label>Stop Location</label>
                <Iframe
                  id="map-test"
                  align="middle"
                  src={
                    "https://www.google.com/maps/embed/v1/place?key=AIzaSyD9TimkBKOZk5xSbKETWW34QFRr2OCvwHE&q=" +
                    trans.latitude +
                    "," +
                    trans.longitude +
                    "&zoom=15"
                  }
                  frameborder="0"
                  // style="border:0"
                  allowfullscreen
                ></Iframe>
              </div>
            </div>

            {/* Information to be entered by admin */}
            <div class="row">
              <div class="form-group col-md-12 mb-6">
                <label for="exampleFormControlTextarea1">admin_comments </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  defaultValue={trans.admin_comments}
                  onInput={this.handleAdminComments.bind(this)}
                  ref="admin"
                ></textarea>
                <small id="admin_commentsHelpInline" class="text-muted">
                  To be entered by admin.
                </small>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 mb-6">
                <label for="validationDefault02">status </label>
                <select
                  class="col-md-12 mb-6 "
                  id="exampleFormControlSelect1"
                  defaultValue={trans.status}
                  onInput={this.handleStatusChange}
                  ref="hello"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <small id="admin_commentsHelpInline" class="text-muted">
                  To be entered by admin.
                </small>
              </div>
            </div>

            <div class="text_center">
              {/* <a
                href={"/" + trans.status}
                type="button"
                class="btn-lg btn-primary col-md-2 mb-3"
              >
                Previous Page
              </a>
              <div class="divider" /> */}

              <button
                type="button"
                class=" btn-lg btn-primary col-md-2 mb-3"
                href="#/{trans.status}"
                onClick={() => this.postData()}
              >
                Save Changes
              </button>
              <div class="divider" />
              <a
                href="/requestStatus"
                type="button"
                class="btn-lg btn-primary col-md-2 mb-3"
              >
                Home Page
              </a>
            </div>
          </form>
        ))}
        <script>
          document.getElementById("map-test").src =
          "https://www.google.com/maps/embed/v1/place?key=AIzaSyD9TimkBKOZk5xSbKETWW34QFRr2OCvwHE&q="
          + this.probs.details.latitude + "," + this.probs.details.longitude +
          "&zoom=15";
        </script>
        <Alert stack={{ limit: 3, spacing: 50 }} />
      </div>
    );
  }
}

export default detailedForm;
