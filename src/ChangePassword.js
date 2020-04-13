import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Cookies from "universal-cookie";
import {Redirect} from 'react-router-dom';

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

export default function App(props){ 
  
  console.log('user', props.user)
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
        "Content-type": "application/json"
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

  const redirectToLogin = () =>{
    props.redirectToLogin();
  }

  return (
    <div className="container-fluid selector-for-some-widget">
      <form onSubmit={handleSubmit(onSubmit)} className="formDetail">
        <h3 className="heading">Password Reset</h3>
        <div className="row">
          <div className="col-md-6 mb-4">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              ref={register}
              // onInput={this.handleemail_id.bind(this)}
            />
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
          <div className="col-md-6 mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              ref={register}
              // onInput={this.handlefirst_name.bind(this)}
            />
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
          className="btn-lg btn-primary col-md-2 mb-3
        dividerheight"
        />
         {props.pageLink==="confirmToken" && <input
          type="button"
          value="Login"
          onClick={redirectToLogin}
          className="btn-lg btn-primary col-md-2 mb-3
        dividerheight"
        />}
      </form>
    </div>
  );
}
