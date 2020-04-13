import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password too weak")
    .max(10, "Password too long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

export default function App(props) {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  var message = "";
  const onSubmit = data => {
    props.user[0]["password"] = data.password;
    fetch(window.$url + "/user/update/password", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + cookies.get("usertoken")
      },
      body: JSON.stringify(props.user[0])
    });
    Alert.success("PASSWORD RESET SUCCESS", {
      position: "top-right",
      effect: "slide",
      offset: 100,
      timeout: 2000
    });
  };

  return (
    <div class="container-fluid selector-for-some-widget">
      <form onSubmit={handleSubmit(onSubmit)} className="formDetail">
        <h3 className="heading">Password Reset</h3>
        <div class="row">
          <div class="col-md-6 mb-4">
            <label for="validationDefault01">Password</label>
            <input
              type="password"
              name="password"
              class="form-control"
              ref={register}
              // onInput={this.handleemail_id.bind(this)}
            />
            <small id="passwordHelp" class="form-text text-muted">
              Password should be between 4-10 characters.
            </small>
            <div className="error-message">
              {errors.password && errors.password.type === "required" && (
                <p>{errors.password.message}</p>
              )}
              {errors.password && errors.password.type === "min" && (
                <p>{errors.password.message}</p>
              )}
              {errors.password && errors.password.type === "max" && (
                <p>{errors.password.message}</p>
              )}
            </div>
          </div>
          <div class="col-md-6 mb-4">
            <label for="validationDefault02">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              class="form-control"
              ref={register}
              // onInput={this.handlefirst_name.bind(this)}
            />
            <small id="confirmPasswordHelp" class="form-text text-muted">
              Password and Confirm Password should match.
            </small>
            <div className="error-message">
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Reset"
          class="btn-lg btn-primary col-md-2 mb-3
        dividerheight"
        />
      </form>
    </div>
  );
}
