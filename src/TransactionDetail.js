import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  useParams
} from "react-router-dom";
import DetailedForm from "./DetailedForm";

class TransactionDetail extends React.Component {
    render() {
        console.log(this.props);
       
        return(
            <div className="TransactionDetail">
                ({this.props.match.params.trans})
                
            </div>
        )
    }
  constructor(props) {
    super(props);

    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    fetch(
      window.$url +
        "/transaction?transaction_no=" +
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
}

export default TransactionDetail;
