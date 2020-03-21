import React, { Component } from 'react';


class FilterForm extends Component{

    constructor(props){
        super(props);
        this.state = {
          transactionNo: '',
          stopID: '',
          direction: '',
          county: '',
          requestID:''  
        }
    }   

    submitForm = (e) => {
        e.preventDefault();
        this.props.handleOnClick(this.state);
      } 

    handleTransNoChange = (e) => {
    console.log(e.target.value);
    this.setState({
        transactionNo: e.target.value
    });
    }

    handleStopIDChange = (e) => {
    console.log(e.target.value);
    this.setState({
        stopID: e.target.value
    });
    }

    handleDirectionChange = (e) => {
    console.log(e.target.value);
    this.setState({
        direction: e.target.value
    });
    }

    handleCountyChange = (e) => {
    console.log(e.target.value);
    this.setState({
        county: e.target.value
    });
    }

    handleRequestIDChange = (e) => {
    console.log(e.target.value);
    this.setState({
        requestID: e.target.value
    });
    }

    render(){
        return(
            <div className="filterForm">
                <form className="form-inline justify-content-center">
                    <div className="row">
                            Transaction No  <input type="text" className="form-control ml-2 mb-2 mr-sm-4" onChange={this.handleTransNoChange}/>
                            Stop ID  <input type="text" className="form-control ml-2 mb-2 mr-sm-4" onChange={this.handleStopIDChange}/>
                            Direction <input type="text" className="form-control ml-2 mb-2 mr-sm-4" onChange={this.handleDirectionChange}/>
                    </div>
                    <div className="row">
                            County <input type="text" className="form-control ml-2 mb-2 mr-sm-4" onChange={this.handleCountyChange}/>
                            Request ID <input type="text" className="form-control ml-2 mb-2 mr-sm-4" onChange={this.handleRequestIDChange}/>
                        <input type="button" value ="Submit" className="form-control ml-2 mb-2 mr-sm-4" onClick={this.submitForm}/>   
                    </div>
                </form>
            </div>
        )
    }
}

export default FilterForm;