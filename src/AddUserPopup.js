import React, { Component } from "react";
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';


const cookies = new Cookies();

class AddUserPopup extends Component{
    constructor(props) {
        super(props);
        this.state={
            error:'',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            contactInfo:'',
            message: '',
            addUserResult: '',
            fieldErrors: {},
            redirect: false
        };
    }

    handleUserInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }

    validateFields = (e) =>{
        e.preventDefault();
        let fieldErrors={};
        let isValid=true;
        if(!this.state.username){
            isValid=false;
            fieldErrors["username"] = "Please enter email ID"
        }
        else{
            let lastAtPos = this.state.username.lastIndexOf('@');
            let lastDotPos = this.state.username.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.username.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.username.length - lastDotPos) > 2)) {
            isValid=false;
            fieldErrors["username"] = "Please enter a valid email ID"
            }
        }

        if(!this.state.password){
            isValid=false;
            fieldErrors["password"] = "Please enter password"
        }
        else if(this.state.password.length<4 || this.state.password.length>10 ){
            isValid=false;
            fieldErrors["password"] = "Password should be atleast 4 and maximum 10 characters."
        }

        if(!this.state.firstName){
            isValid=false;
            fieldErrors["firstName"] = "Please enter first name"
        }
        if(this.state.firstName && !this.state.firstName.match(/^[a-zA-Z]+$/)){
                isValid=false;
                fieldErrors["name"] = "Please enter only letters in name"
        }  
        if(this.state.lastName && !this.state.lastName.match(/^[a-zA-Z]+$/)){
            isValid=false;
            fieldErrors["lastName"] = "Please enter only letters in name"
        } 
        if(this.state.contactInfo && this.state.contactInfo.length!==10){
            isValid=false;
            fieldErrors["contactInfo"] = "Contact should be of 10 digits."
        }
        
        console.log(fieldErrors)
        console.log(isValid)
        this.setState({fieldErrors: fieldErrors})
        if(isValid)
            this.addUser();
    }

    async addUser() {
        console.log('Here'+this.state.username, this.state.password, this.state.firstName)
            try {
                await fetch(window.$url+"/register", {
                method: "POST",
                mode: "cors",
                headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer "+ cookies.get('usertoken')
                },
        
                body: JSON.stringify(
                {username: this.state.username,
                password:this.state.password,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                contactInfo:this.state.contactInfo
                }
                )
            })
            .then(response => response.json())
            .then(result => this.setState({addUserResult: result}))
            .catch(error => this.setState({error: error}));
            } catch (e) {
                this.setState({error:e});
        }  
    
        console.log('addUserResult',this.state.addUserResult)
        if(this.state.addUserResult.status===401)
        {
            this.setState({redirect:true});
        }
        else if(this.state.addUserResult.user_id!==undefined && this.state.addUserResult.user_id!==''){
            this.setState({message: 'User added succesfully with ID: ' + this.state.addUserResult.user_id})
        }
        else if(this.state.addUserResult.status===500)
                this.setState({message: 'User already exists'});
        else
            this.setState({message: 'Internal error occurred. Please try again'});
        
    }
      


    closeUserPopup = e=>{
        e.preventDefault();
        this.props.handleOnClose(this.state);
    }

    render(){
        if(this.state.redirect){
            return <Redirect to={{
             pathname: '/',
             state: { status: '401' }
         }}/>
        }
        return(
            <div>
            <form className="form-inline justify-content-center">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addRoute">
                Add User
                </button>

                <div className="modal fade" id="addRoute" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add User</h5>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                First Name
                                <input
                                type="text"
                                className="form-control ml-2 mb-2 mr-sm-4"
                                name="firstName"
                                onChange={this.handleUserInput}
                                />
                                <span style={{color: "red"}}>{this.state.fieldErrors["firstName"]}</span>
                                <span style={{color: "red"}}>{this.state.fieldErrors["name"]}</span>
                            </div>
                            <div className="row">
                                Last Name
                                <input
                                type="text"
                                className="form-control ml-2 mb-2 mr-sm-4"
                                name="lastName"
                                onChange={this.handleUserInput}
                                />
                                <span style={{color: "red"}}>{this.state.fieldErrors["lastName"]}</span>
                            </div>
                            <div className="row">
                                Email ID
                                <input
                                type="email"
                                className="form-control ml-2 mb-2 mr-sm-4"
                                name="username"
                                onChange={this.handleUserInput}
                                required
                                />
                                <span style={{color: "red"}}>{this.state.fieldErrors["username"]}</span>
                            </div>
                            <div className="row">
                                Password
                                <input
                                type="password"
                                className="form-control ml-2 mb-2 mr-sm-4"
                                name="password"
                                onChange={this.handleUserInput}
                                />
                                <span style={{color: "red"}}>{this.state.fieldErrors["password"]}</span>
                            </div>
                            <div className="row">
                                Contact
                                <input
                                type="number"
                                className="form-control ml-2 mb-2 mr-sm-4"
                                name="contactInfo"
                                onChange={this.handleUserInput}
                                />
                            <span style={{color: "red"}}>{this.state.fieldErrors["contactInfo"]}</span>
                            </div>
                            <div className="row justify-content-md-center" style={{color: "blue"}}>
                            {this.state.message}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.validateFields}>Save User</button>
                        <button type="button" className="btn btn-secondary" data-dismiss='modal' onClick={this.closeUserPopup}>Close</button>
                    </div>
                    </div>
                </div>
                </div>
            </form>
    </div>
    
        );
    }
}

export default AddUserPopup;