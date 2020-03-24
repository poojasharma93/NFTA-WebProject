import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect,useParams} from 'react-router-dom';

class TransactionDetail extends React.Component {
<<<<<<< HEAD
    
    render() {
        console.log(this.props);
       
        return(
            <div className="TransactionDetail">
                ({this.props.match.params.trans})
                
            </div>
        )
    }
=======
  constructor(props) {
    super(props);

    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.trans)
    fetch(
      "http://localhost:8080/transaction?transaction_no=" +
        this.props.match.params.trans
    )
      .then(results => results.json())
      .then(
        data => {
          this.setState({
            transactions: data
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  render() {
    const { transactions } = this.state;
    console.log(this.props);
    return (
      <div>
        {" "}
        <DetailedForm details={transactions} />
      </div>
    );
  }
>>>>>>> 270f5a8... Web Changes
}

export default TransactionDetail;