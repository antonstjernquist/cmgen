import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/confirmactions.css';
import { printMessage } from './globalfunctions.js';
import Expandbutton from './expandbutton.js';
import { actionRemoveAction, actionConfirmAllActions, actionUndoItem } from '../actions/actions.js';

class ConfirmActions extends Component {

  constructor(props){
    super(props);
    this.state = {
      expand: true
    }
  }

  toggleExpand = () => {
    this.setState({expand: !this.state.expand})
  }

  handleRemoveClick = time => {
    this.props.dispatch(actionRemoveAction(time))
  }

  handleCallback = (callback, time) => {
    callback();
    this.props.dispatch(actionRemoveAction(time))
  }
  handleConfirmAll = () => {

    /* confirmAllActions = Remove all items from itemsToBeRemoved */
    this.props.dispatch(actionConfirmAllActions())
  }
  handleUndoClick = () => {
    if(!this.props.itemsToBeRemoved.length){
      printMessage('Nothing to undo', 'warning');
    } else {
      this.props.dispatch(actionUndoItem());
    }
  }

  render() {

    /* remove items list */
    let listPresent = this.props.itemsToBeRemoved.map(x => {
      // console.log('This is the.. present list X:', x);
     return (
       <div className="actionToBeConfirmedDiv">
         <span>{x.type}</span>
         <span>{x.uid}</span>
         <span>{x.name}</span>
         <div className="buttonHolder">
           <i className="material-icons"> check </i>
           <i className="material-icons"> clear </i>
         </div>
       </div>
     )
   })

    if(this.state.expand){
      return (
          <div className="confirmActionsWrapper">
            <h1> Confirm actions ({this.props.itemsToBeRemoved.length})</h1>
            <Expandbutton toggle={this.toggleExpand} val={this.state.expand} />
            <span> There is currently {this.props.itemsToBeRemoved.length} action(s) awaiting confirmation</span>

            <div className={this.props.past.length ? '' : 'displayNone'}>
              <div className="actionListHeader">
                <span>Type</span>
                <span>ID</span>
                <span>Name</span>
                <span>Action</span>
              </div>
              <div className="actionListWrapper">
                {listPresent}
              </div>
              <button onClick={this.handleUndoClick} className="confirmAllButton"> Undo </button>
              <button onClick={this.handleConfirmAll} className="confirmAllButton"> Confirm all </button>
          </div>

        </div>
      );
    } else {
      return (
          <div className="confirmActionsWrapper">
            <h1> Confirm actions ({this.props.past.length}) </h1>
            <Expandbutton toggle={this.toggleExpand} val={this.state.expand} />
          </div>
      );
    }

  }
}

let mapPropsFromStoreState = state => {
  return {
    items: state.items.itemData.present,
    past: state.items.itemData.past,
    actions: state.actions,
    itemsToBeRemoved: state.items.itemsToBeRemoved.present,
    pastItemsToBeRemoved: state.items.itemsToBeRemoved.past
  };
};

export default connect(mapPropsFromStoreState)(ConfirmActions);
