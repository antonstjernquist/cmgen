import React, { Component } from 'react';
import Expandbutton from './expandbutton.js';
import { connect } from 'react-redux';
import '../css/cart.css';
import { profitFromNumber, getPriceFromItem, printMessage } from './globalfunctions.js';

/* Import actions */
import { actionRemoveItemFromCart, actionGenerateCommandToggle, actionUndoCart } from '../actions/actions.js';
class Cart extends Component {

  constructor(props){
    super(props);
    this.state = {
      expand: true
    }
  }
  /* Keep the state to expand or not inside the component to not conflict with other components. (Could possibly be done with a expandReducer?) */
  toggleExpand = () => {
    this.setState({expand: !this.state.expand})
  }

  calculateProfit = (buyState = true, returnNumber = false) => {
    let val = 0;
    for(let item of this.props.items){
      /* Imported function */
      if(item.buyState === buyState){
        val += getPriceFromItem(item);
      }
    }

    if(!returnNumber){
      return profitFromNumber(val);
    } else {
      return val;
    }
  }

  getQuantity = (buyState = true) => {
    let val = 0;
    for(let item of this.props.items){
      if(item.buyState === buyState){
        val += item.quantity;
      }
    }
    return val;
  }

  getListLength = (buyState = true) => {
    return this.props.items.filter(x => x.buyState === buyState).length;
  }

  showThisFromBuystate = (buyState = true) => {
    return this.props.items.find(x => x.buyState === buyState);
  }

  calculateNewBalance = (number = false, type = 'normal') => {
    /* True, true = buy = decrease in money, false, true = sell = Increase in money */
    if(!number){
      return profitFromNumber(this.props.balance - (this.calculateProfit(false, true) - this.calculateProfit(true, true)), type);
    } else {
      return this.props.balance - (this.calculateProfit(false, true) - this.calculateProfit(true, true));
    }
  }

  removeItemFromCart = item => {
    if(item) {
      this.props.dispatch(actionRemoveItemFromCart(item));
      printMessage('Removed item from cart', 'success', 3000);
    }
  }

  generateCommandClick = () => {
    this.props.dispatch(actionGenerateCommandToggle());
  }
  handleUndoClick = () => {
    this.props.dispatch(actionUndoCart());
  }

  render() {


    /* Create the list here to display in cart. */
    let cartList = this.props.items.map(x => {

      return(
        <div className="listDiv">
          <div className="nameAndCategory">
            <span className={x.name.length > 14 ? 'hovername' : null }> {x.name} </span>
            <span className="hoverText">{x.name}</span>
            <span>{x.main_category}</span>
          </div>

          <div className="hdivider"></div>

          <div className="typeAndQuantityDiv">
            <div>
              <span> {x.quantity} pcs</span>
            </div>
            <div>
              <span> {x.quality}q</span>
            </div>
          </div>

          <div className="hdivider"></div>


          {profitInListDiv(x)}

          <button onClick={e => this.removeItemFromCart(x)} className="removeFromCartButton"> <i className="material-icons"> clear </i> </button>
          <span className="hoverRemoveButton"> Remove item</span>
        </div>
      )
    })

    if(this.state.expand){
      return (
        <div className="cartWrapperDiv">
          <h1>Cart ({this.props.items.length} items)</h1>
          <span className={this.props.items.length ? null : 'displayNone'}> This view displays the items you have put in your cart and it contains the following {this.props.items.length} items. To generate the command for these items press the button at the bottom of this view.</span>
          <span className={this.props.items.length ? 'displayNone' : null}> Your cart is empty. Add items from the market list to your right. </span>

          <div className="cartListWrapper">
            {cartList}
          </div>

          <div className={this.props.items.length ? 'totalCostDivWrapper' : 'displayNone'}>
            <h1>Summary</h1>
            <div className="totalCostPriceDiv">
              <div className={this.showThisFromBuystate() ? null : 'displayNone'}>
                <h2> Selling {this.getListLength()} item(s) </h2>
                <span className="costSpanHeader"> Profit </span>
                <span> {this.calculateProfit()}</span>
                <span className="costSpanHeader"> Total quantity</span>
                <span> {this.getQuantity()}</span>
              </div>
              <div className={this.showThisFromBuystate(false) ? null : 'displayNone'}>
                <h2> Buying {this.getListLength(false)} item(s)</h2>
                <span className="costSpanHeader"> Cost </span>
                <span> {this.calculateProfit(false)}</span>
                <span className="costSpanHeader"> Total quantity</span>
                <span> {this.getQuantity(false)}</span>
              </div>
            </div>
            <h1> Transaction </h1>
            <div className="newBalanceDiv">
              <h3>Old balance</h3>
              <span> {profitFromNumber(this.props.balance)} </span>
              <div className="newBalanceAndDifferenceDiv">

                <div>
                  <h3>New balance</h3>
                  <span> {this.calculateNewBalance(null, 'minimal')} </span>
                </div>
                <div>
                  <h3>Difference</h3>
                  {differenceDisplayDiv(this.calculateNewBalance(true) - this.props.balance)}
                </div>
              </div>

              {balanceResultSpan(this.calculateNewBalance(true))}
            </div>
          </div>
          {ctaButton(this.calculateNewBalance(true), this.props.items.length, this.generateCommandClick, this.handleUndoClick)}
          <Expandbutton toggle={this.toggleExpand} val={this.state.expand} />
        </div>
      );
    } else {
      return (
        <div className="cartWrapperDiv">
          <h1>Cart ({this.props.items.length} items)</h1>
          <Expandbutton toggle={this.toggleExpand} val={this.state.expand} />
        </div>
      )
    }
  }
}

function ctaButton(show, items, handleClick, handleUndoClick ) {
  if(show >= 0 && items){
    return (
      <div className="generateCommandAndUndoButtonDiv">
        <button className="ctaButton" onClick={handleClick}> Generate command </button>
        <button className="ctaButton" onClick={handleUndoClick}> Undo </button>
      </div>
    )
  } else if(show < 0 && items){
    return (
      <span className="hoverText"> You cannot afford these items. Add funds or remove something from the cart. </span>
    )
  }
}

function profitInListDiv(item){

  let price = profitFromNumber(getPriceFromItem(item), 'minimal');
  if(price.length > 14){
    return (
      <div className="profitDiv nameAndCategory">
        <span>{item.buyState ? 'Profit' : 'Cost'}</span>
        <span className={item.buyState ? 'profitSpan hovername' : 'costSpan hovername'}> {price} </span>
        <span className="hoverText">{price}</span>
      </div>
    )
  } else {
    return (
      <div className="profitDiv nameAndCategory">
        <span>{item.buyState ? 'Profit' : 'Cost'}</span>
        <span className={item.buyState ? 'profitSpan' : 'costSpan'}> {price} </span>
      </div>
    )
  }

}

function balanceResultSpan(balance) {
    if(balance < 0){
      return (
        <div className="balanceResultDiv minus">
          <span><i className="material-icons md-24"> clear </i></span>
        </div>
      )
    } else if(balance >= 0){
      return (
        <div className="balanceResultDiv plus">
          <span><i className="material-icons md-24"> check </i></span>
        </div>
      )
    } else {
      return (
        <div className="balanceResultDiv even">
          <span>-</span>
        </div>
      )
    }
}

function differenceDisplayDiv(number) {

  if(number > 0){
    return (
      <span className="positivDifference">
        {profitFromNumber(number, 'minimal')}
      </span>
    )
  } else {
    return (
      <span className="negativDifference">
        {profitFromNumber(number, 'minimal')}
      </span>
    )
  }
}

let mapPropsFromStoreState = state => {
  return {
    items: state.cart.present,
    buyState: state.buyState,
    messages: state.messageArray,
    balance: state.balance
  };
};

export default connect(mapPropsFromStoreState)(Cart);
