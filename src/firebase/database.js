import { database } from './firebase.js';

export const updateStore = () => {
  console.log('Retrieving items..');
  return database.ref('items/').once('value');
}

export const addItem = () => {
  console.log('Adding item..');

  database.ref('items/').push({name: 'berra', id: 2, image: 'this.url'});
}

export const createItem = item => {
  database.ref('items/' + item.id).set(item);
}
export const removeItem = item => {
    console.log('Removing item: ', item);
    database.ref('items/' + item.id).remove();
}

export const listenToItems = callback => {
  database.ref('items/').on('value', function(snapshot){
        callback(snapshot);
  });
}




export const listenToConnection = printMessage => {
  var conRef = database.ref(".info/connected");
  conRef.on('value', function(snap) {
    if (snap.val() === true) {
      printMessage('Connected', 'success');
    } else {
      printMessage('Disconnected', 'warning');
    }
  });
}
