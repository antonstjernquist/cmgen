import React, { Component } from 'react';

class Expandbutton extends Component {
  render() {
    return (
      <button onClick={this.props.toggle} className="expandButton"> <i className="material-icons"> {this.props.val ? 'expand_less' : 'expand_more'} </i></button>
    );
  }
}

export default Expandbutton;
