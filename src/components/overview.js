import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseFunctions } from '../firebase';
import FilterOptions from './filteroptions.js';
import '../css/overview.css';

/* Fetch */

/* URL EXAMPLE WORKING: https://lifeisfeudal.gamepedia.com/api.php?action=query&titles=thin_leather&prop=pageimages&format=json&pithumbsize=100 */


class Overview extends Component {

  constructor(props) {
    super(props);
    console.log('I have props: ', props);
    this.state = {
      showCategory: false,
      sortitem: null,
      filterText: '',
      filterCategory: '',
      viewType: ''
    }
  }

  handleRefreshClick = () => {
    firebaseFunctions.updateStore();
  }

  handleFilterText = event => {
    this.setState({filterText: event.target.value});
  }


  handleMouseLeave = () => {
    this.setState({showCategory: false});
  }

  handleCategoryClick = event => {
    this.setState({showCategory: !this.state.showCategory, filterCategory: event.target.innerText})
  }

  getParams = () => {
    return {
      filterText: this.state.filterText,
      filterCategory: this.state.filterCategory,
      viewType: this.state.viewType
    }
  }

  setViewType = (event, type) => {
    this.setState({viewType: type});
  }

  render() {

    return (
      <div className="overviewWrapper">
        <div className="overviewButtonWrapper">
          <h1> Database overview ({this.props.items.length} items) </h1>
          <button onClick={this.handleRefreshClick} className="ctaButton"> Refresh database </button>
        </div>
        <span className="overviewInfoMessage">
          This contains the overview of the database. From here we can see all the items present in the database and
          filter them on different criterias, aswell as change the view for what is most suitible for our task. {this.state.viewType ? this.state.viewType : '-- No view type specified --'}
        </span>

        <div className="databaseListHeader">
          <span> Name </span>
        </div>

        <div className="databaseList">
        <FilterOptions databaseView={true}/>
        </div>
      </div>
    )
  }
}



let mapPropsFromStoreState = state => {
  return {
    items: state.items.itemData.present,
    messages: state.messageArray
  };
};

export default connect(mapPropsFromStoreState)(Overview);
