import React from "react";
import DetailedForm from "./DetailedForm";
import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";

const cookies = new Cookies();

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
      transactions: [],
      redirect: false
    };
  }

  componentDidMount() {
    fetch(
      window.$url +
        "/transaction?transaction_no=" +
        this.props.match.params.trans,  {
          headers: {
            "Authorization": "Bearer "+ cookies.get('usertoken')
          }}
    )
      .then(results => {
        if(results.status===401)
        {
            this.setState({redirect:true});
        }
        else{
            return results.json();
        }
      })
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

    if(this.state.redirect){
      return <Redirect to={{
       pathname: '/',
       state: { status: '401' }
       }}/>
    }

    const { transactions } = this.state;
    console.log(this.props);
    return (
      <div>
        <DetailedForm details={transactions} />
      </div>
    );
  }
}

export default TransactionDetail;
