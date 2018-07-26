import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../css/addtocartbutton.css'
import { printMessage } from './globalfunctions.js';
import { actionGenerateCommandToggle} from '../actions/actions.js';
import '../css/generatecommand.css';


class GenerateCommand extends Component {

  generatedCommand = (copy = false) => {
    let sellingItems = [];
    let buyingItems = [];
    let currencyArray = [];
    /* Lets map and return a string */
    for(let item of this.props.cart){
      if(item.buyState){
        sellingItems.push(`cmChatCommand("", "/add ${item.uid} ${item.quantity} ${item.quality}");`);
      } else {
        buyingItems.push(`cmChatCommand("", "/add ${item.uid} ${item.quantity} ${item.quality}");`);
      }
    }

    if(copy){
      return sellingItems.join(' ') + ' ' + buyingItems.join(' ') + ' ' + currencyArray.join(' ');
    }

    return (
        <div className="generatedCommandItemDivWrapper">

          <div className={sellingItems.length ? null : 'displayNone'}>
            <h3> Selling </h3>
            <span className="generatedCodeSpan">
              {sellingItems.join(' ')}
            </span>
          </div>
          <div className={buyingItems.length ? null : 'displayNone'}>
            <h3> Buying </h3>
            <span className="generatedCodeSpan">
              {buyingItems.join(' ')}
            </span>
          </div>

          <div className={currencyArray.length ? null : 'displayNone'}>
            <h3> Currency </h3>
            <span className="generatedCodeSpan">
              {currencyArray.join(' ')}
            </span>
          </div>
        </div>
    )
  }

  handleCloseClick = () => {
    this.props.dispatch(actionGenerateCommandToggle());
  }
  onCopy = () => {
    printMessage('Copied!', 'success');
  }

  render() {
    if(this.props.show){
      return (
        <div className="cmGenOutsideWrapper">
          <div className="cmGenDiv">
            <div>
              <div className="cmGenHeaderDiv">
                <h1> Generated command </h1>
                  <CopyToClipboard text={this.generatedCommand(true)} onCopy={this.onCopy}>
                    <button className="copyButton"> Copy to clipboard </button>
                  </CopyToClipboard>
              </div>
                {this.generatedCommand()}
            </div>
            <button onClick={this.handleCloseClick}>Close</button>
          </div>
        </div>
      );
    } else return null;
  }
}

let mapStateToProps = state => {
  return {
    cart: state.cart.present,
    show: state.showCmGen,
    balance: state.balance
  }
}

export default connect(mapStateToProps)(GenerateCommand);
