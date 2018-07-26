import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionRemoveMessage } from '../actions/actions.js';

/* Fetch */

/* URL EXAMPLE WORKING: https://lifeisfeudal.gamepedia.com/api.php?action=query&titles=thin_leather&prop=pageimages&format=json&pithumbsize=100 */


class Messages extends Component {

  handleRemoveClick = (e, message) => {
    console.log('Message being removed is: ', message);
    this.props.dispatch(actionRemoveMessage(message));
  }

  render() {
    let limit = 0;
    let sorted = this.props.messages.sort((x, y) => x.time < y.time);
    let list = sorted.map((x, index) => {
      /* If the message time + 5 seconds still is less than current time, show it */
      if(false){
        console.log('Not showing this old message.');
        return null;
      } else if(limit < 2){
        limit++;
        /* Show message */
        return (
          <div className={'message' + x.status.toLowerCase() } key={x.time} onClick={event => this.handleRemoveClick(event, x)}>
            <span> {x.message} </span>
            <span className="messageTime"> {x.time} </span>
          </div>
        )
      } else return null;
    });

    return (
        <div className="messageHolder">
          {list}
        </div>
    );
  }
}

let mapPropsFromStoreState = state => {
  return {
    value: state.value,
    list: state.list,
    messages: state.messageArray
  };
};

export default connect(mapPropsFromStoreState)(Messages);
