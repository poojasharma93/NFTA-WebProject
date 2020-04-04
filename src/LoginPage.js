import React from 'react';
import {FormErrors} from './FormErrors';
import {Redirect} from 'react-router-dom';
import qs from 'qs';


class LoginPage extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      redirect: false,
      formErrors: {emailError:'', passwordError:'', login:''}
    }
  }


  handleChange = e =>{
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    if(this.state.email && this.state.password){
      //code to encrypt password
      //check successful login -> call API and check response
      //this.fetchResult();
      sessionStorage.setItem('user',JSON.stringify(this.state.email));
      this.setState({redirect: true});
      
       }
    else
      {
        let fieldValidationError = this.state.formErrors;
        fieldValidationError.emailError=this.state.email? '' : 'Please enter Email ID';
        fieldValidationError.passwordError=this.state.password? '' : 'Please enter Password';
        fieldValidationError.login='Login Unsuccessful';
        this.setState({formErrors:fieldValidationError});
      }
    }
  
  async fetchResult(){

    const data = new FormData();
    data.append('username', 'anuj3@gmail.com');
    data.append('password', 'anuj78911');
    var urlencoded = new URLSearchParams();
      urlencoded.append('username', 'anuj3@gmail.com');
      urlencoded.append('password', 'anuj78911');

      let requestOptions = {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: 'username=anuj3@gmail.com&password=anuj78911'
      };

      console.log(urlencoded);
      console.log(requestOptions);
      fetch(window.$url+"/login", {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: 'username=anuj3@gmail.com&password=anuj78911'
        })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

  }

  render () {
    
    if(this.state.redirect){
      return (<Redirect to={'/transactions'}/>)
    }

    return (
      <div>

      <div className="row" id="Body">
      <form className="form-inline justify-content-center">
      <h4>Login</h4>
        <div className="row">
        
        <label>Email</label>
        <input input type="email" className="form-control ml-2 mb-2 mr-sm-4" 
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
          required/>
        </div>
        <div className="row">
        <label>Password</label>
        <input type="password" className="form-control ml-2 mb-2 mr-sm-4"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          required/>
        </div>
        <div className="row">
        <input type="submit" className="button success" value="Login" onClick={this.handleSubmit}/>
        </div>
        <div className="row">
        <FormErrors formErrors={this.state.formErrors} />
       
        </div>
        </form>
      </div>

    </div> 
       


    )
  }
}


export default LoginPage;