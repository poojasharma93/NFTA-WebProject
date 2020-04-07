import React from "react";
import Iframe from "react-iframe";
import { formPost } from "./formPost";
import Cookies from 'universal-cookie';

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

      const result = await fetch(window.$url + "/updateTransaction", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer "+ cookies.get('usertoken')
        },

        body: JSON.stringify(this.props.details[0])
      });
    } catch (e) {
      console.log(e);
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
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">transaction_no</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value={trans.transaction_no}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">stop_id</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.stop_id}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">direction</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.direction}
                />
              </div>
            </div>
            {/*street_on,nearest_cross_street,position
             */}
            <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">street_on</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value={trans.street_on}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">nearest_cross_street</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.nearest_cross_street}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">position</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.position}
                />
              </div>
            </div>
            {/* 	fastened_to,location,county
             */}
            <div class="row">
              <div class="col-md-4 mb-6">
                <label for="validationDefault01">fastened_to</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value="."
                  value={trans.fastened_to}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">location</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.location}
                />
              </div>
              <div class="col-md-4 mb-6">
                <label for="validationDefault02">county</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value={trans.county}
                />
              </div>
            </div>
            {/* status,shelter,advertisement
             */}
            <div class="row">
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
            </div>
            {/* bench,bike_rack,trash_can
             */}
            <div class="row">
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
            </div>
            {/* time_table,system_map,work_request
             */}
            <div class="row">
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
            </div>
            {/* user_id,device_id,
             */}
            <div class="row">
              <div class="col-md-6 mb-6">
                <label for="validationDefault01">user_id</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value={trans.user_id}
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
            </div>
            {/* additional_information,admin_comments
             */}
            <div class="row">
              <div class="form-group col-md-6 mb-6">
                <label for="exampleFormControlTextarea1">
                  additional_information
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={trans.additional_information}
                ></textarea>
              </div>
            </div>
            {/* private String location; */}
            {/*  */}
            {/*  */}
            {/* Images */}
            <div class="row">
              <div class="col-md-4 mb-6 ">
                <a class="lightbox " href="#dog">
                  <img
                    src="https://images.pexels.com/photos/136743/pexels-photo-136743.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    class="thumbnail float-left"
                    alt="No preview"
                  />
                </a>
                <div
                  class="lightbox-target container-fluid selector-for-some-widget"
                  id="dog"
                >
                  <img
                    src="https://images.pexels.com/photos/136743/pexels-photo-136743.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="No preview"
                  />
                  <a class="lightbox-close" href="#"></a>
                </div>
              </div>

              <div class=" col-md-4 mb-6  ">
                <a class="lightbox " href="#dog">
                  <img
                    src="https://images.pexels.com/photos/136743/pexels-photo-136743.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    class="thumbnail float-middle"
                    alt="No preview"
                  />
                </a>
                <div
                  class="lightbox-target container-fluid selector-for-some-widget"
                  id="dog"
                >
                  <img
                    src="https://images.pexels.com/photos/136743/pexels-photo-136743.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="No preview"
                  />
                  <a class="lightbox-close" href="#"></a>
                </div>
              </div>

              <div class=" col-md-4 mb-6  ">
                <a class="lightbox " href="#dog">
                  <img
                    src="https://images.pexels.com/photos/136743/pexels-photo-136743.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    class="thumbnail float-right"
                    alt="No preview"
                  />
                </a>
                <div
                  class="lightbox-target container-fluid selector-for-some-widge"
                  id="dog"
                >
                  <img
                    src="https://images.pexels.com/photos/136743/pexels-photo-136743.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="No preview"
                  />
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
                    "https://www.google.com/maps/embed/v1/place?key=AIzaSyAv0zyP8tzjgAiAMRXiUuzM05obKYSKrvc&q=" +
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
              <a
                href={"/" + trans.status}
                type="button"
                class="btn-lg btn-primary col-md-2 mb-3"
              >
                Previous Page
              </a>
              <div class="divider" />

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
                href="/transactions"
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
          "https://www.google.com/maps/embed/v1/place?key=AIzaSyAv0zyP8tzjgAiAMRXiUuzM05obKYSKrvc&q="
          + this.probs.details.latitude + "," + this.probs.details.longitude +
          "&zoom=15";
        </script>
      </div>
    );
  }
}

export default detailedForm;
