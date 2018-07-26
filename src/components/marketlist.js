import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionSwitchBuyState } from '../actions/actions.js';
import FilterOptions from './filteroptions.js';
import '../css/marketlist.css';

/* Fetch */

/* URL EXAMPLE WORKING: https://lifeisfeudal.gamepedia.com/api.php?action=query&titles=thin_leather&prop=pageimages&format=json&pithumbsize=100 */


class Marketlist extends Component {


  handleSwitchClick = () => {
    this.props.dispatch(actionSwitchBuyState());
    console.log('Buying is now: ', !this.props.buyState);
    // printMessage('Selling is not yet implemented! Stay tuned.', 'warning');
  }

  render() {

    return (
        <div className="marketListWrapper">
          <div className="titleAndBuyOrSell">
            <h1> Market list {this.props.user !== null ? 'Hi ' + this.props.user.given_name : '(No user)'}</h1>
            <div className="buyOrSellDiv" onClick={this.handleSwitchClick}>
              <span className={this.props.buyState ? 'buyOrSellHighlight' : null}> Sell </span>
              <i className="material-icons">
                swap_horiz
              </i>
              <span className={this.props.buyState ? null : 'buyOrSellHighlight'}> Buy</span>
            </div>
          </div>
          <FilterOptions />
        </div>
    );
  }
}

let mapPropsFromStoreState = state => {
  return {
    user: state.user,
    items: state.items.itemData.present,
    buyState: state.buyState
  };
};

export default connect(mapPropsFromStoreState)(Marketlist);
