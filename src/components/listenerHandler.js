import { database, firebaseFunctions } from '../firebase';
import { printMessage } from './globalfunctions.js';

function callbackListenToItems(snapshot){
  /* This function gets called whenever there is a change in the database */
  console.log('Change was found in the database under /items');
  setTimeout(function(){
    firebaseFunctions.updateStore();
  }, 10)
}

export const initialize = () => {
  console.log('ListenerHandler initialized.');

  database.listenToItems(callbackListenToItems);


  /* Connection listener */
  database.listenToConnection(printMessage);
}
