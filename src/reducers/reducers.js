import { database } from '../firebase';
import { combineReducers } from 'redux';
import { NO_DATA, LOADED, LOADING, FETCHING_DATA, FETCH_GOT_DATA, FETCH_FAILED, FETCH_ERROR, CREATE_ITEM, REMOVE_ITEM, CONFIRM_ALL, UNDO_ITEM, GENERATE_TOGGLE } from '../actions/constants.js';

/* Import user constants */
import { LOGIN, LOGOUT } from '../actions/constants.js';
/* Import cart & balance constants */
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_ITEM_IN_CART, SET_BALANCE, UNDO_CART} from '../actions/constants.js';

/* User reducer */
let userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.data;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};


let valueReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    default:
      return state;
  }
}

let databaseReducer = (state = null, action) => {
  switch ( action.type ){
    case CREATE_ITEM:
      database.createItem(action.item);
      return state;
    default:
      return state;
  }
}

/* Item reducer handling all items */
let itemReducer = (state = {fetchState: NO_DATA, itemData: { past: [], present: [], future: []}, itemsToBeRemoved: { past: [], present: [], future: []} }, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        fetchState: LOADING
      }
    case FETCH_FAILED:
      return {
        ...state,
        fetchState: NO_DATA,
        error: FETCH_ERROR
      }

    /* Retrieving all items fram database */
    case FETCH_GOT_DATA:

      /* Convert data to list */
      let list = [];
      for(let item in action.data){
        action.data[item].uid = item - 0;
        list.push(action.data[item]);
      }

      return {
        ...state,
        fetchState: LOADED,
        itemData: {
            ...state.itemData, /* Add present to the past (This action should not be "undoable" )*/
            present: list, /* Set present to the latest list */
            future: []
        }
      }
    /* Undos */
    case UNDO_ITEM:

      /* If there is no past */
      if( state.itemData.past.length < 1 )
        return state;

      let last = state.itemData.past[state.itemData.past.length - 1]; /* Latest item added to the past */
      let lastRemoveItem = state.itemsToBeRemoved.past[state.itemsToBeRemoved.past.length - 1]; /* lastRemoveItem added to the past */
      console.log('Last remove item is: ', lastRemoveItem);
      return {
        ...state,
        itemData: {
            past: state.itemData.past.filter(x => x !== last), /* Remove last item from the past, since it's now the present. */
            present: last,
            future: [...state.itemData.future, state.itemData.present]
        },
        itemsToBeRemoved: {
            past: state.itemsToBeRemoved.past.filter(x => x !== lastRemoveItem),
            present: lastRemoveItem,
            future: [...state.itemsToBeRemoved.future, state.itemsToBeRemoved.present]
        }
      }
    /* Removes item */
    case REMOVE_ITEM:
      return {
        ...state,
        fetchState: LOADED,
        itemData: {
            past: [...state.itemData.past, state.itemData.present], /* Add present to the past before removing the item so we can undo it */
            present: state.itemData.present.filter(x => x.uid !== action.item.uid),
            future: []
        },
        itemsToBeRemoved: {
            past: [...state.itemsToBeRemoved.past, state.itemsToBeRemoved.present],
            present: [...state.itemsToBeRemoved.present, {...action.item, type: 'REMOVE'}],
            future: []
        }
      }

    case CONFIRM_ALL:

      /* Remove from database then */
      for(let item of state.itemsToBeRemoved.present){
        if(item.type === 'REMOVE'){
          database.removeItem(item);
        }
      }

      return {
        ...state,
        itemsToBeRemoved: {
          past: [...state.itemsToBeRemoved.past, state.itemsToBeRemoved.present],
          present: [],
          future: []
        }
      }
    default:
      return state;
  }
}

let messsageReducer = (state = [], action) => {

  switch (action.type) {
    case 'MESSAGE':
      return [...state, {
        message: action.message,
        status: action.status,
        time: action.time
      }];
    case 'UPDATEMESSAGE':
      console.log('State is: ', state);
      /* Limit the messages in the reducer? */
      return state.filter(x => (x.time + 5000) > Date.now());
    case 'REMOVEMESSAGE':
      console.log('reducer.js: Removing message..');
      return state.filter(x => (x.time !== action.time));
    default:
      return state;
  }
}

let buyStateReducer = (state = true, action) => {
  switch (action.type) {
    case 'SWITCH_BUY_STATE':
      return !state
    default:
      return state;
  }
}

let sortReducer = (state = {by: 'name', direction: 'down'}, action) => {
  switch (action.type) {
    case 'SET_SORT_BY':
      return {
        ...state,
        by: action.data
      };
    case 'SET_SORT_DIRECTION':
      return {
        ...state,
        direction: action.data
      };
    default:
      return state;
  }
}

/* cart reducer */
let cartReducer = (state = {past: [], present: [], future: []}, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        past: [...state.past, state.present], /* Add present to past */
        present: [...state.present, action.item]
      }
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        past: [...state.past, state.present], /* Add present to past */
        present: state.present.filter(x => x.time !== action.item.time)
      }
    case UPDATE_ITEM_IN_CART:
      let indexOfOldItem = state.present.findIndex(x => x.time === action.oldItem.time);
      return {
        ...state,
        past: [...state.past, state.present], /* Time travel bruh */
        present: [
          ...state.present.slice(0, indexOfOldItem),
          action.newItem,
          ...state.present.slice(indexOfOldItem + 1)
        ]
      }
    case UNDO_CART:
      let last = state.past[state.past.length - 1];
      return {
        ...state,
        past: state.past.filter(x => x !== last),
        present: last,
        future: [...state.future, ...state.present]
      }
    default:
      return state;
  }
}

/* Balance reducer */
let balanceReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_BALANCE:
      return action.data;
    default:
      return state;
  }
}
let cmGenReducer = (state = false, action) => {
  switch (action.type) {
    case GENERATE_TOGGLE:
      console.log('Toggled! ', !state);
      return !state;
    default:
      return state;
  }
}

let rootReducer = combineReducers({
  value: valueReducer,
  user: userReducer,
  items: itemReducer,
  database: databaseReducer,
  messageArray: messsageReducer,
  buyState: buyStateReducer,
  sort: sortReducer,
  cart: cartReducer,
  balance: balanceReducer,
  showCmGen: cmGenReducer
})

export default rootReducer;
