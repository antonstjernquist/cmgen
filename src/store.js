import rootReducer from './reducers/reducers.js';
import { createStore } from 'redux';
import { NO_DATA } from './actions/constants.js';
/* Initial state */
const initialState = {
    value: 4,
    balance: 0,
    showCmGen: false,
    user: null,
    items: {
      fetchState: NO_DATA,
      itemData: {
        past: [],
        present: [],
        future: [],
      },
      itemsToBeRemoved: {
        past: [],
        present: [],
        future: []
      }
    },
    messageArray: [],
    buyState: true,
    sort: {
      by: 'name',
      direction: 'down'
    },
    cart: {
      past: [],
      present: [],
      future: [],
    }
};

/* Store */
const store = createStore(rootReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
