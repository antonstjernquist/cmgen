import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../firebase';
import { printMessage } from './globalfunctions.js';
import { actionLogin, actionLogout } from '../actions/useractions.js';

/* Fetch */

/* URL EXAMPLE WORKING: https://lifeisfeudal.gamepedia.com/api.php?action=query&titles=thin_leather&prop=pageimages&format=json&pithumbsize=100 */


class Header extends Component {

  handleLoginClick = () => {
    auth.doLogInWithGoogle()
    .then(result => {
      let user = result.additionalUserInfo;
      if(user){
        if(user.isNewUser){
          printMessage('Welcome!', 'success');
        }

        this.props.dispatch(actionLogin(user.profile));
        console.log('User: ', user);
      } else {
        console.log('No user');
      }
    })
    .catch(err => {
      if(err.code === 'auth/popup-closed-by-user'){
        printMessage('The login window was closed. Try to log in again!', 'error');
        console.log(err);
      } else {
        console.log(err);
      }
    })
  }

  handleLogoutClick = () => {
    this.props.dispatch(actionLogout());
    if(this.props.currentTab === 'ADMIN'){
      this.props.changeTab('MARKETLIST');
    }
  }

  render() {
    if(this.props.user){
      return (
          <header>
            <h1> CmGen </h1>
            <div className="searchBar">
              <i className="material-icons"> search </i>
              <input type="text" placeholder="Search.." />
            </div>
            <div className="headerLinks">
              <span onClick={event => this.props.changeTab('MARKETLIST')}> Market list </span>
              <span onClick={event => this.props.changeTab('ADMIN')}> Administration panel</span>
              <span onClick={this.handleLogoutClick}>Logout</span>
            </div>
          </header>
      );
    } else {
      return (
          <header>
            <h1> CmGen </h1>
            <div className="searchBar">
              <i className="material-icons"> search </i>
              <input type="text" placeholder="Search.." />
            </div>
            <div className="headerLinks">
              <span onClick={event => this.props.changeTab('MARKETLIST')}> Market list </span>
              <span onClick={this.handleLoginClick}> Login</span>
            </div>
          </header>
      );
    }
  }
}

let mapPropsFromStoreState = state => {
  return {
    value: state.value,
    list: state.list,
    user: state.user
  };
};

export default connect(mapPropsFromStoreState)(Header);
