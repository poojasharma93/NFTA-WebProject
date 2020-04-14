import React from 'react';
import {Redirect} from 'react-router-dom';

class ForgotPassword extends React.Component {

    constructor(props){
        super(props);
        this.modalButton = React.createRef();
        this.state={
          email: "",
          fieldErrors: '',
          forgotPasswordResult: "",
          errror: "",
          modalMessage:"",
          modalStatus:"",
          redirectToLogin:false
        }
    }

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validateFields = (e) =>{
        this.setState({modalMessage: ""})
        let fieldErrors={};
        let isValid=true;
        if(!this.state.email){
            
            isValid=false;
            fieldErrors["email"] = "Please enter Email ID"
        }
        else{
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
            isValid=false;
            fieldErrors["email"] = "Please enter a valid email ID"
            }
        }
    
        this.setState({fieldErrors: fieldErrors})
        if(isValid){
            this.handleSubmit();
        }
    }


    async handleSubmit() {    
        try {
            await fetch(window.$url+"/user/forgotPassword", {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json"
            },
    
            body: JSON.stringify({username: this.state.email})
              
          })
          .then(response => response.text())
          .then(result => this.setState({forgotPasswordResult: result}))
          .catch(error => this.setState({error: error}));
        } catch (e) {
            this.setState({error:e});
            console.log(e)
        }
        console.log(this.state.forgotPasswordResult)
        let message = ""
        if(this.state.forgotPasswordResult === ""){
            this.setState({modalMessage: "An email is sent to the email ID " + this.state.email,
                        modalStatus: 'success'});
        }
        else if(this.state.forgotPasswordResult === "no such user exists"){
            this.setState({modalMessage: "No such user exists",
                        modalStatus: 'error'});
        }
        else{
        this.setState({modalMessage:"Some error occurred. Please try again later",
                        modalStatus: 'error'});
        }
        this.showPopup();
    }

    showPopup(){
        this.modalButton.current.click();
    }

    closePopup = ()=>{
        if(this.state.modalStatus==='success' || this.state.modalStatus===''){
          this.setState({redirectToLogin: true})
        }
    }

    back = ()=>{
          this.setState({redirectToLogin: true})
    }

    render () {

        if(this.state.redirectToLogin){
          return <Redirect to='/'/>
        }
    
        return (
        
          <div className='container-fluid forgotpwd-container w-75'>
                
                <form> 
                    <div className="form-group">
                        <h5 className="text-left">Please enter Email ID</h5>
                        <input className="form-control" 
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required/>
                        <span style={{color: "red"}}>{this.state.fieldErrors["email"]}</span>
                    </div>
                    <div className="form-group d-inline ">
                     <input type="button" className="btn btn-primary col-md-2 mr-5" value="Submit" onClick={this.validateFields}/>
                     <input type="button" className="btn btn-primary col-md-2 mr-5" hidden value="Button" ref={this.modalButton} data-toggle="modal" data-target="#responseForgotPassword"/>
                     <input type="button" className="btn btn-primary col-md-2" value="Back" onClick={this.back}/>
                    </div>
                    
                </form>
                <div className="modal fade" id="responseForgotPassword" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row justify-content-md-center">
                                        {this.state.modalMessage}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss='modal' onClick={this.closePopup}>Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            
            </div>
        )
    }
}

export default ForgotPassword;