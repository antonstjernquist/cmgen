import { database } from './index.js';
import { actionFetchingData, actionFetchGotData, actionFetchFailed} from '../actions/actions.js';
import { printMessage } from '../components/globalfunctions.js';
/* Import the store */
import store from '../store.js';


export const updateStore = () => {
  store.dispatch(actionFetchingData());

  setTimeout(function() {
    database.updateStore()
    .then(res => {
      console.log('Dispatching result to store.');
      printMessage('Successfully retrieved all items from the database', 'success');
      store.dispatch(actionFetchGotData(res.val()));
    })
    .catch(err => {
      store.dispatch(actionFetchFailed(err));
      console.log('Error: ', err);
    })
  }, 100)
}
