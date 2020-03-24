// currently not in use
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  useParams
} from "react-router-dom";
export function formPost(data) {
  return fetch("http://localhost:8080/updateTransaction", {
    method: "POST",
    mode: "CORS",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}
