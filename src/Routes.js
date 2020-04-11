import React, { Component } from "react";
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';
import AddRoutePopup from './AddRoutePopup';


const cookies = new Cookies();

class Routes extends Component{
    
    constructor() {
        super();
        this.state={
            routes:[],
            error:'',
            redirect: false
        };
    }

    handleOnClose = (e) =>{
        window.location.reload();
    }

    componentDidMount(){
        
        fetch(window.$url + "/routes", {
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
                    routes: data
                });
            },
            (error) => {
                this.setState({
                  error: error
                });
              }
            )
        
            
        console.log("state", this.state.routes);
    }
        

    render(){

        if(this.state.redirect){
            return <Redirect to={{
             pathname: '/',
             state: { status: '401' }
         }}/>
        }
        const {routes} = this.state;
        console.log(routes);

        return(
            <div>
            <div className="table-wrapper-scroll-y table-scrollbar">
                
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Route ID</th>
                        <th scope="col">Route Info</th>
                    </tr>
                        {routes.map(route => (
                        <tr key={route.routeid}>
                        <td> {route.routeid} </td>
                        <td> {route.routeInfo}</td>
                        </tr>
                        ))}
                </thead>
            </table>
            </div>
            <div>
            <AddRoutePopup handleOnClose={this.handleOnClose}/>
            </div>
        </div>                
        
    );
  }
}

export default Routes;
