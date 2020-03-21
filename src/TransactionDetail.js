import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect,useParams} from 'react-router-dom';

class TransactionDetail extends React.Component {
    
    render() {
        console.log(this.props);
       
        return(
            <div className="TransactionDetail">
                ({this.props.match.params.trans})
                
            </div>
        )
    }
}

export default TransactionDetail;