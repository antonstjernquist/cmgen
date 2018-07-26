import { FETCHING_DATA, FETCH_FAILED, FETCH_GOT_DATA, CREATE_ITEM, REMOVE_ITEM, NEW_ACTION, REMOVE_ACTION, CONFIRM_ALL, UNDO_ITEM, GENERATE_TOGGLE } from './constants.js';

/* Import cart & Balance constants */
import { UNDO_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_ITEM_IN_CART, SET_BALANCE } from './constants.js';


export const actionFetchingData = () => {
  return {
    type: FETCHING_DATA
  }
}

export const actionFetchFailed = message => {
  return {
    type: FETCH_FAILED,
    message
  }
}

export const actionFetchGotData = data => {
  return {
    type: FETCH_GOT_DATA,
    data
  }
}


/* Create item action */

export const actionCreateItem = item => {
    return {
      type: CREATE_ITEM,
      item
    }
}

export const actionRemoveItem = item => {
    return {
      type: REMOVE_ITEM,
      item
    }
}

export const actionCreateMessage = (message, status, time) => {
    return {
      type: 'MESSAGE',
      status,
      message,
      time: time ? time : Date.now()
    }
}


export const actionUpdateMessages = () => {
    return {
      type: 'UPDATEMESSAGE'
    }
}
export const actionRemoveMessage = message => {
    return {
      type: 'REMOVEMESSAGE',
      time: message.time
    }
}



/* Actions */
export const actionNewAction = (callback, type, data) => {
    return {
      type: NEW_ACTION,
      callback,
      data,
      actiontype: type,
      time: Date.now()
    }
}

export const actionRemoveAction = time => {
    return {
      type: REMOVE_ACTION,
      time
    }
}

export const actionConfirmAllActions = () => {
    return {
      type: CONFIRM_ALL
    }
}

export const actionUndoItem = () => {
    return {
      type: UNDO_ITEM
    }
}

export const actionSwitchBuyState = () => {
  return {
    type: 'SWITCH_BUY_STATE'
  }
}

/* Sort actions */

export const actionSetSortBy = data => {
  return {
    type: 'SET_SORT_BY',
    data
  }
}

export const actionSetSortDirection = data => {
  return {
    type: 'SET_SORT_DIRECTION',
    data
  }
}

/* Cart actions */
export const actionAddItemToCart = item => {
  return {
    type: ADD_ITEM_TO_CART,
    item
  }
}

export const actionRemoveItemFromCart = item => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    item
  }
}
export const actionUpdateItemInCart = (oldItem, newItem) => {
  return {
    type: UPDATE_ITEM_IN_CART,
    oldItem,
    newItem
  }
}
export const actionUndoCart = () => {
  return {
    type: UNDO_CART
  }
}

/* Balance actions */
export const actionSetBalance = data => {
  return {
    type: SET_BALANCE,
    data
  }
}

/* Generate command actions */
export const actionGenerateCommandToggle = () => {
  return {
    type: GENERATE_TOGGLE
  }
}
