import store from '../store.js';
import { actionCreateMessage, actionRemoveMessage } from '../actions/actions.js';

export const printMessage = (message, status, timeoutTime = 5000) => {
  let time = Date.now()
  store.dispatch(actionCreateMessage(message, status, time));

  setTimeout(function() {
    store.dispatch(actionRemoveMessage({time: time}))
  }, timeoutTime)
}

export const getPriceFromItem = item => {
  let buyState = item.buyState ? 'buy' : 'sell';
  let price = (item.prices[buyState][item.quality] - 0);
  return price * item.quantity;
}

export const profitFromNumber = (number, type = 'normal') => {
  let gold = number >= 0 ? Math.floor(number / 100) : Math.ceil(number / 100);
  let copper = number % 100;
  let strNumber = number;
  // console.log('Gold is: ', gold);
  // console.log('Copper is: ', copper);
  /* Make number readable (ezpz solution lululul) */
  if(number > 10000 && number < 99999){
    number = number.toString();
    strNumber = number.slice(0, 2) + ' ' + number.slice(2);
  } else if(number > 100000 && number < 999999){
    number = number.toString();
    strNumber = number.slice(0, 3) + ' ' + number.slice(3);
  } else if((number > 1000000 && number < 9999999) || (number < -1000000 && number > -9999999)){
    number = number.toString();

    /* If it's a large minus number */
    if(number < 0){
      strNumber = number.slice(0, 2) + ' ' + number.slice(2);
      strNumber = strNumber.slice(0, 6) + ' ' + strNumber.slice(6);
    } else {
      strNumber = number.slice(0, 1) + ' ' + number.slice(1);
      strNumber = strNumber.slice(0, 5) + ' ' + strNumber.slice(5);
    }
  }

  /* Normal type converter */
  if(type === 'normal'){
    if((gold > 0 && copper === 0) || (gold < 0 && copper === 0)){

      /* If we have gold */
      return gold + ' gold (' + strNumber + 'c)';
    } else if((gold > 0 && copper > 0) || (gold < 0 && copper < 0) ){
      return gold + ' gold & ' + copper + ' copper (' + strNumber + 'c)'
    } else {
      return strNumber + ' copper';
    }
  } else if(type === 'minimal'){
    if((gold > 0 && copper === 0) || (gold < 0 && copper === 0)){
      return gold + ' gold';
    } else if((gold > 0 && copper > 0) || (gold < 0 && copper < 0)){
      return gold + ' gold & ' + Math.abs(copper) + ' copper'
    } else {
      console.log('Returning strNumber');
      return strNumber + ' copper';
    }
  } else {
    if(gold > 0 && copper === 0){
      return gold + ' gold (' + number + 'c)';
    } else if(gold > 0 && copper > 1){
      return gold + ' gold & ' + copper + ' copper (' + number + 'c)'
    } else {
      return number + ' copper';
    }
  }
}
