import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/balance.css'
import { printMessage, profitFromNumber } from './globalfunctions.js';
import { actionSetBalance } from '../actions/actions.js';


class Balance extends Component {

  constructor(props){
    super(props);
    this.state = {
      edit: false,
      inputGoldValue: '',
      inputCopperValue: ''
    }
  }

  handleEditClick = () => {
    this.setState({edit: !this.state.edit});
    if(!this.state.edit){
      return;
    }

    let gold = this.state.inputGoldValue;
    let copper = this.state.inputCopperValue;

    let value = (gold * 100) + copper;
    if( value > 0 ){
      if(value === this.props.balance){
        printMessage('Balanced was not changed', 'info');
      } else {
        printMessage('Your new balance is ' + profitFromNumber(value, 'minimal'), 'success');
        this.props.dispatch(actionSetBalance(value))
      }
    } else {
      printMessage('Balance entered is too low or not a number!', 'error');
    }

  }
  handleGoldChange = event => {
    this.setState({inputGoldValue: event.target.value - 0});
  }
  handleCopperChange = event => {
    this.setState({inputCopperValue: event.target.value - 0});
  }

  render() {
    if(!this.state.edit){
      return(
        <div className="balanceWrapperDiv">
          <h1> Balance </h1>
          <div className="balanceDisplayDiv">
            <span> {profitFromNumber(this.props.balance, 'minimal')}</span>
            <button onClick={this.handleEditClick}>
              <i className="material-icons">
                edit
              </i>
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="balanceWrapperDiv">
          <h1> Balance </h1>
          <div className="balanceDisplayDiv">


            <div className="inputHolderDiv">
              <div className="goldDivWrapper">
                <input type="number" onChange={this.handleGoldChange} value={this.state.inputGoldValue} placeholder="Gold.."/>
              </div>
              <div className="copperDivWrapper">
                <input type="number" onChange={this.handleCopperChange} value={this.state.inputCopperValue} placeholder="Copper.."/>
              </div>
            </div>

            <button onClick={this.handleEditClick}>
              <i className="material-icons">
                alt_save
              </i>
            </button>

          </div>
        </div>
      )
    }
  }
}

let mapStateToProps = state => {
  return {
    balance: state.balance
  }
}

export default connect(mapStateToProps)(Balance);
