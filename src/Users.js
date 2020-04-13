import React, { Component } from "react";
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';
import AddUserPopup from './AddUserPopup';

const cookies = new Cookies();

class Users extends Component{
    
    constructor() {
        super();
        this.state={
            users:[],
            error:'',
            redirect: false,
            showDeletePopup: false,
            selectedUsername: '',
            selectedUserID:'',
            message: ''
        };
        //this.handleClick = this.handleClick.bind(this);
    }

    handleOnClose = (e) =>{
        window.location.reload();
    }

    componentDidMount(){
        
        fetch(window.$url + "/users", {
            headers: {
              "Authorization": "Bearer "+ cookies.get('usertoken')
            }})
        .then(results =>  {
            if(results.status===401)
            {
                this.setState({redirect:true});
            }
            else{
                return results.json();
            }
        })
        .then(
            (data) => {
                
                this.setState({ 
                    users: data
                });
            },
            (error) => {
                this.setState({
                  error: error
                });
              }
            )
        
    }
        
    handleOnClick(username, user_id){
       this.setState({selectedUsername: username})
       this.setState({selectedUserID: user_id})
    }

    async deleteUser() {
        try {
            console.log('UserID' + this.state.selectedUserID)
            await fetch(window.$url+"/user/delete/" + this.state.selectedUserID, {
            method: "DELETE",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              "Authorization": "Bearer "+ cookies.get('usertoken')
            }
          })
        .then(response => response.text())
        .then(result => this.setState({deleteUserResult: result}))
        .catch(error => this.setState({error: error}));
        } catch (e) {
            this.setState({error:e});
        }
        
        console.log('deleteUserResult',this.state.deleteUserResult)
        if(this.state.deleteUserResult.status===401)
        {
            this.setState({redirect:true});
        }
        else if(this.state.deleteUserResult!==''){
            this.setState({message: this.state.deleteUserResult})
        }
        else{
            this.setState({message: 'Some error occurred'});
        }
    
      }

    render(){

        if(this.state.redirect){
            return <Redirect to={{
             pathname: '/',
             state: { status: '401' }
         }}/>
        }
        const {users} = this.state;
        console.log(users);

        return(
            <div>
                
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Contact Info</th>
                        <th scope="col"></th>
                    </tr>
                        {users.map(user => (
                        <tr key={user.user_id}>
                        <td> {user.user_id} </td>
                        <td> {user.username}</td>
                        <td> {user.first_name} </td>
                        <td> {user.last_name} </td>
                        <td> {user.contact_info} </td>
                        <td>
                        {user.username!==cookies.get('username') && <button type="button" className="close" aria-label="Close" onClick={this.handleOnClick.bind(this, user.username, user.user_id)} data-toggle="modal" data-target="#deleteUser" >
                            <span aria-hidden="true" style={{color: "red"}}>&times;</span>
                        </button>}
                        </td>
                        </tr>
                        ))}
                </thead>
            </table>

            <div className="modal fade" id="deleteUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add User</h5>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                Are you sure you want to delete {this.state.selectedUsername}?
                            </div>
                            <div className="row justify-content-md-center" style={{color: "blue"}}>
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => this.deleteUser()}>Yes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss='modal' onClick={this.handleOnClose}>Close</button>
                    </div>
                    </div>
                </div>
            </div>

            <div>
            <AddUserPopup handleOnClose={this.handleOnClose}/>
            </div>
        </div>          
        
    );
  }
}

export default Users;
