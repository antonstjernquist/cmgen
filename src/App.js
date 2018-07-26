import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import Add from './components/add.js';
import Marketlist from './components/marketlist.js';
import Header from './components/header.js';
import Messages from './components/messages.js';
import DatabaseOverview from './components/overview.js';
import ConfirmActions from './components/confirmactions.js';
import Cart from './components/cart.js';
import Balance from './components/balance.js';
import GenerateCommand from './components/generatecommand.js';
import * as ListenerHandler from './components/listenerHandler.js'
class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      tab: 'MARKETLIST'
    }
  }

  componentDidMount(){
    /* When the app mounts for the first time we initialize the listeners needed */
    ListenerHandler.initialize();
  }

  changeTab = tab => {
    this.setState({tab: tab});
  }

  getTab = () => {
    switch (this.state.tab) {
      case 'MARKETLIST':
        return (
          <React.Fragment>
            <Messages />
            <GenerateCommand />
            <div className="cartAndMarketListWrapper">
              <div className="balanceAndCartWrapper">
                <Balance />
                <Cart />
              </div>
              <Marketlist />
            </div>
          </React.Fragment>
        )
      case 'ADMIN':
        return(
          <React.Fragment>
            <Messages />
            <div className="panelWrapper">
              <div className="newItemAndConfirmActionsWrapper">
                <Add />
                <ConfirmActions />
              </div>
              <DatabaseOverview />
            </div>
          </React.Fragment>
        )
      default:
        return (<Marketlist />)
    }
  }

  render() {
    return (
      <div>
        <Header changeTab={this.changeTab} currentTab={this.state.tab}/>
        {this.getTab()}
      </div>
    );
  }
}

/* Map redux store to the props of this components */
let mapPropsFromStoreState = state => {
  return {
    value: state.value,
    list: state.list
  };
};

export default connect(mapPropsFromStoreState)(App);
