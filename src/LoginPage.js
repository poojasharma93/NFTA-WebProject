import React from 'react';
import {FormErrors} from './FormErrors';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { strict } from 'assert';

const cookies = new Cookies();

class LoginPage extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      redirect: false,
      formErrors: {emailError:'', passwordError:'', login:''},
      loginResult: "",
      errror: ""
    }
  }


  handleChange = e =>{
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(){
    if(this.state.email && this.state.password){
      try {
        await fetch(window.$url+"/authenticate", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },

        body: JSON.stringify(
          {username: this.state.email,
          password:this.state.password
          }
        )
      })
      .then(response => response.json())
      .then(result => this.setState({loginResult: result}))
      .catch(error => this.setState({error: error}));
      } catch (e) {
          this.setState({error:e});
      }
      console.log(this.state.loginResult)
      if(this.state.loginResult.token===undefined){
        let fieldValidationError = this.state.formErrors;
        fieldValidationError.login='Either username or password is incorrect. Please try again';
        this.setState({formErrors:fieldValidationError});
      }
      else{
      cookies.set('usertoken', this.state.loginResult.token, {maxAge: 60*60*3, sameSite: strict})
      cookies.set('username', this.state.email, {maxAge: 60*60*3, sameSite: strict})
      this.setState({redirect: true});
      }
      
    }
    else{
        let fieldValidationError = this.state.formErrors;
        fieldValidationError.emailError=this.state.email? '' : 'Please enter Email ID';
        fieldValidationError.passwordError=this.state.password? '' : 'Please enter Password';
        this.setState({formErrors:fieldValidationError});
      }
    }



  render () {
    
    if(this.state.redirect){
      return (<Redirect to={'/transactions'}/>)
    }

    if(cookies.get('usertoken')!==undefined && cookies.get('usertoken')!=="" &&
    this.props.location.state===undefined){
      return (<Redirect to={'/transactions'}/>)
    }

    return (
      <div className='container login-container'>

      <div className="row">
        <div className="col-md-6 login-form">
          <h3>NFTA Web Console</h3>
          <form> 
            <div className="form-group">
              <input className="form-control" 
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required/>
            </div>
            <div className="form-group">
              <input type="button" className="btnSubmit" value="Login" onClick={()=>this.handleSubmit()}/>
            </div>
            <div class="form-group">
                <a href="#" class="ForgotPwd">Forgot Password?</a>
            </div>
            <div className="form-group form-errors">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
        </form>
      </div>

    </div> 
  </div>

    )
  }
}


export default LoginPage;