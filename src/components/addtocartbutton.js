import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/addtocartbutton.css'
import { printMessage, getPriceFromItem, profitFromNumber } from './globalfunctions.js';
import { actionAddItemToCart, actionUpdateItemInCart } from '../actions/actions.js';


class AddToCartButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      quantity: ''
    }
  }

  handleAddClick = () => {
    let quantity = this.state.quantity - 0;
    let quality = this.props.quality;
    if(typeof quantity === 'number' && quality){
      if(quantity > 0){
        /* Dispatch action adding this item to the cart! with buystate, quantity and quality specificed! */
        let item = {
          ...this.props.item,
          quantity,
          buyState: this.props.buyState,
          quality,
          time: Date.now()
        }

        /* Check if the item already exists in the database */
        let findFunction = y => {
          if(y.uid === item.uid){
            if(y.buyState === item.buyState){
              if(y.quality === item.quality){
                /* Okay, this item clearly is already displayed. Let's update that in the redux store accordingly */
                /* X is the new Item and Y is the old one, we need to change the Y item in the store function(OLDITEM, NEWITEM)*/
                item.quantity = (y.quantity + item.quantity);
                this.props.dispatch(actionUpdateItemInCart(y, item));
                return true;
              }
            }
          }
          return false;
        }
        if(this.props.cart.find(findFunction)){
          printMessage( item.name + ' was updated in the cart. New quantity is ' + item.quantity, 'success');
        } else {
          let profitValue = profitFromNumber(getPriceFromItem(item));
          printMessage('Successfully added ' + quantity + ' ' + this.props.item.name + '(s) to the cart for a value of '+profitValue+'!', 'success');

          console.log('Adding.. ', item);
          this.props.dispatch(actionAddItemToCart(item));
        }


      } else {
        printMessage('The quantity specificed is too low or not a number, try entering a higher number', 'error')
      }
    } else {
      printMessage('We could unfortunately not add this item', 'error')
    }
  }

  handleChange = event => {
    let val = event.target.value - 0;
    console.log('Typeof is: ', typeof val);
    if(typeof val === 'number'){
      this.setState({quantity: event.target.value});
    } else {
      console.warn('This is not a valid number');
    }
  }

  render() {
    return (
      <div className="addToCartButtonDiv">
        <input type="number" placeholder="Amount" value={this.state.quantity} onChange={this.handleChange}/>
        <button onClick={this.handleAddClick}> ADD </button>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    cart: state.cart.present,
    buyState: state.buyState
  }
}

export default connect(mapStateToProps)(AddToCartButton);
