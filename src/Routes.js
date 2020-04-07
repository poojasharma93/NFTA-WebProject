import React, { Component } from "react";
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';

const cookies = new Cookies();

class Routes extends Component{
    
    constructor() {
        super();
        this.state={
            routes:[],
            error:'',
            routePopup: false,
            routeId: '',
            routeName: '',
            message: '',
            addRouteResult: '',
            redirect: false
        };
    }

    closeRoutePopup = e=>{
        this.setState({routePopup: false});
    }

    handleRouteInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }

    async addRoute() {
        console.log(this.state.routeId, this.state.routeInfo)
        try {
            await fetch(window.$url+"/route/add", {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              "Authorization": "Bearer "+ cookies.get('usertoken')
            },
    
            body: JSON.stringify(
              {routeid: this.state.routeId,
              routeInfo:this.state.routeInfo
              }
            )
          })
        .then(response => response.text())
        .then(result => this.setState({addRouteResult: result}))
        .catch(error => this.setState({error: error}));
        } catch (e) {
            this.setState({error:e});
          console.log(e);
        }
        
        console.log('addRouteResult',this.state.addRouteResult)
        if(this.state.addRouteResult===''){
            this.setState({message: 'Route added succesfully!'})
        }
        else{
            this.setState({message: this.state.addRouteResult});
        }
    
      }

    closeModal = e => {
        //window.location.reload();
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

        if(routes.status===false){
        return <h1>{routes.message}</h1>
        }
        
        return(
            <div>
                
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

            <form className="form-inline justify-content-center">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addRoute">
                Add Route
                </button>

                <div className="modal fade" id="addRoute" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add Route</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                Route ID
                                <input
                                type="text"
                                className="form-control ml-2 mb-2 mr-sm-4"
                                name="routeId"
                                onChange={this.handleRouteInput}
                                />
                            </div>
                            <div className="row">
                                Route Info
                                <input
                                type="text"
                                className="form-control ml-2 mb-2 mr-sm-4"
                                name="routeInfo"
                                onChange={this.handleRouteInput}
                                />
                            </div>
                            <div className="row">
                            {this.state.message}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => this.addRoute()}>Save Route</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal()}>Close</button>
                    </div>
                    </div>
                </div>
                </div>
            </form>
        <script>
        $('#addRoute').on('hidden.bs.modal', function () {
            
        });
        </script>
        </div>

        
    );
  }
}

export default Routes;
