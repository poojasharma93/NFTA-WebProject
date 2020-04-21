import React from 'react';
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';
import ChangePassword from './ChangePassword';
import Alert from "react-s-alert";

class ResetPassword extends React.Component {

    constructor(props){
        super(props);
        this.state={
            user: "",
            confirmTokenResult: "",
            errror: "",
            redirectToLogin:false,
            token:queryString.parse(this.props.location.search).token,
            isTokenConfirm: false,
            resultsFetched: false
          }
    }

    async componentDidMount(){
        console.log(this.state.token)
        try{
            const response = await fetch(window.$url + "/confirmreset",  {
                method: "POST",
                mode: "cors",
                headers: {
                  Accept: "application/json",
                  "Content-type": "application/json"
                },    
                body: JSON.stringify(
                  {reset_token: this.state.token
                  }
                )});
            const json = await response.json();
            this.setState({ confirmTokenResult: json });
            }catch (error) {
                console.log(error);
            }
            console.log('result',this.state.confirmTokenResult)

            if(this.state.confirmTokenResult.length!==0){
                this.setState({isTokenConfirm: true})
                this.setState({user: this.state.confirmTokenResult[0]})
            }
            else{
                this.setState({isTokenConfirm: false})
                this.setState({redirectToLogin:true})
            }
            console.log('user',this.state.user)

    }

    redirectToLogin = e =>{
        console.log('resetpwd')
        this.setState({redirectToLogin:true})
    }
    
    render(){

        if(this.state.redirectToLogin){
            return <Redirect to='/'/>
          }
        
       return(
           <div>
               {this.state.isTokenConfirm && <ChangePassword user={this.state.confirmTokenResult} pageLink="confirmToken" redirectToLogin={this.redirectToLogin}/> }
               <Alert stack={{ limit: 3, spacing: 50 }} onClose={this.redirectToLogin}/>
           </div>
       )
    }
}

export default ResetPassword;