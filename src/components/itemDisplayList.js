import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionRemoveItem, actionNewAction, actionSetSortBy, actionSetSortDirection } from '../actions/actions.js';
import { REMOVE_ITEM, NO_DATA } from '../actions/constants.js';
import { printMessage } from './globalfunctions.js';
import AddToCartButton from './addtocartbutton.js';
import '../css/displayList.css';
import '../css/spinner.css';

class Managebuttons extends Component {

  handleRemoveClick = () => {

    /* Define callback */
    const callback = () => {
      console.log('I was the action.');
      printMessage( this.props.item.name + ' removed from database successfully', 'success');
    }

    /* Dispatch */
    this.props.dispatch(actionNewAction(callback, REMOVE_ITEM, this.props.item));
    this.props.dispatch(actionRemoveItem(this.props.item))
  }

  render() {
    return (
      <div className="manageButtonsWrapper">
        <i className="material-icons">
          edit
        </i>
        <i onClick={this.handleRemoveClick} className="material-icons">
          delete
        </i>
      </div>
    )
  }
}


class LoadingSpinner extends Component {
  render() {
    if(this.props.fetchState === NO_DATA) {
      return(
        <div className="loadingSpinnerDiv">
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </div>
      )
    } else return null;
  }
}

class ItemList extends Component {
  constructor(props){
    super(props);
    console.log('Useful constructor');
    this.state = {
      quality: 50
    }
  }

  handleQualityClick = (e, quality) => {
    console.log('Quality clicked!');
    let qualityList = [50, 60, 70, 80, 90, 100]
    if(typeof quality === 'number'){
      if(qualityList.includes(quality)){
        this.setState({quality: quality});
      } else {
        console.log('This quality is not specified in our list. Contact someone.');
      }
    }
  }

  setSort = (e, val) => {
    if(this.props.sort.by !== val){

      /* Change direction */
      this.props.dispatch(actionSetSortBy(val))
    } else {

      /* Set sort */
      if(this.props.sort.direction === 'down'){
        this.props.dispatch(actionSetSortDirection('up'))
      } else {
        this.props.dispatch(actionSetSortDirection('down'))
      }
    }
  }

  render() {

    /* Text filter */
    let filteredList = this.props.items.filter(x => x.name.toLowerCase().includes(this.props.params.filterText.toLowerCase()));

    /* Category filter */
    let categoryFilteredList = filteredList.filter(x => x.main_category.toLowerCase().includes(this.props.params.filterCategory.toLowerCase()) || this.props.params.filterCategory === 'All');



    let list = categoryFilteredList.map(x =>  {

      let viewType = this.props.params.viewType;

      if(this.props.databaseView){
        if(viewType === 'bglist'){
          /* Large list display type */
            return (
              <div className="bglistDiv" key={x.uid}>
                <img src={x.imageurl} alt={x.name}/>

                <div className="nameAndCategory">
                  <span> {x.name} </span>
                  <span> {x.main_category} </span>
                </div>
              </div>
            )
        } else if(viewType === 'module'){
            /* Module display type */
              return (
                <div className="moduleDiv" key={x.uid}>
                  <span> {x.name} </span>
                  <span> UID: {x.uid} </span>
                  <span> ID: {x.id} </span>
                </div>
              )
        } else {
          /* Normal list display type */
            return (
              <div className="listDiv" key={x.uid}>
                <div className="nameAndCategory">
                  <span className={x.name.length > 14 ? 'hovername' : null }> {x.name} </span>
                  <span className="hoverText"> {x.name} </span>
                  <span> {x.main_category} </span>
                </div>

                <div className="hdivider"></div>

                <div className="pricesWrapper">
                  <div className="buyPricesDiv">
                    <span> Buy </span>
                    <span> {x.prices.buy[50]}</span>
                    <span> {x.prices.buy[60]}</span>
                    <span> {x.prices.buy[70]}</span>
                    <span> {x.prices.buy[80]}</span>
                    <span> {x.prices.buy[90]}</span>
                    <span> {x.prices.buy[100]}</span>
                  </div>

                  <div className="vdivider"> </div>

                  <div className="sellPricesDiv">
                    <span>  Sell </span>
                    <span> {x.prices.sell[50]}</span>
                    <span> {x.prices.sell[60]}</span>
                    <span> {x.prices.sell[70]}</span>
                    <span> {x.prices.sell[80]}</span>
                    <span> {x.prices.sell[90]}</span>
                    <span> {x.prices.sell[100]}</span>
                  </div>
                </div>

                <Managebuttons item={x} dispatch={this.props.dispatch} />

              </div>
            )
        }
      } else {
        if(viewType === 'bglist'){
          /* Large list display type */
            return (
              <div className="bglistDiv" key={x.uid}>
                <img src={x.imageurl} alt={x.name}/>

                <div className="nameAndCategory">
                  <span> {x.name} </span>
                  <span> {x.main_category} </span>
                </div>
              </div>
            )
        } else if(viewType === 'module'){
            /* Module display type */
              return (
                <div className="moduleDiv" key={x.uid}>
                  <span> {x.name} </span>
                  <span> UID: {x.uid} </span>
                  <span> ID: {x.id} </span>
                </div>
              )
        } else {
          /* Normal list display type */
            return (
              <div className="listDiv" key={x.uid}>
                <div className="nameAndCategory">
                  <span className={x.name.length > 14 ? 'hovername' : null }> {x.name} </span>
                  <span className="hoverText"> {x.name} </span>
                  <span> {x.main_category} </span>
                </div>

                <div className="hdivider"></div>

                <div className={this.props.buyState ? 'pricesWrapper' : 'displayNone'}>

                  <div className="sellPricesDiv">
                    <span> Buy </span>
                    <span> {x.prices.buy[50]}</span>
                    <span> {x.prices.buy[60]}</span>
                    <span> {x.prices.buy[70]}</span>
                    <span> {x.prices.buy[80]}</span>
                    <span> {x.prices.buy[90]}</span>
                    <span> {x.prices.buy[100]}</span>
                  </div>
                </div>

                <div className={this.props.buyState ? 'displayNone' : 'pricesWrapper'}>
                  <div className="sellPricesDiv">
                    <span>  Sell </span>
                    <span> {x.prices.sell[50]}</span>
                    <span> {x.prices.sell[60]}</span>
                    <span> {x.prices.sell[70]}</span>
                    <span> {x.prices.sell[80]}</span>
                    <span> {x.prices.sell[90]}</span>
                    <span> {x.prices.sell[100]}</span>
                  </div>
                </div>

                <AddToCartButton item={x} quality={this.state.quality}/>
              </div>
            )
        }
      }
      /* End here */
    })

    return (
        <div className="itemListWrapper">
          <div className="marketListHeader">

            <div className="sortHolderDiv">
              <div className="marketListHeaderItem" onClick={e => this.setSort(e, 'name')}>
                <span className={this.props.sort.by === 'name' ? 'filterHighlight unsel' : 'unsel'} >Name</span>
                  <i className="material-icons">
                    {this.props.sort.direction === 'up' && this.props.sort.by === 'name' ? 'arrow_drop_up' : 'arrow_drop_down'}
                  </i>
              </div>

              <div className="marketListHeaderItem" onClick={e => this.setSort(e, 'price')}>
                <span className={this.props.sort.by === 'price' ? 'filterHighlight unsel' : 'unsel'}>Price</span>
                  <i className="material-icons">
                    {this.props.sort.direction === 'up' && this.props.sort.by === 'price' ? 'arrow_drop_up' : 'arrow_drop_down'}
                  </i>
              </div>
            </div>
            <div className={this.props.databaseView ? 'displayNone' : 'marketListHeaderItemQualityDiv'}>
              <span onClick={event => this.handleQualityClick(event, 50)}>50q</span>
              <span onClick={event => this.handleQualityClick(event, 60)}>60q</span>
              <span onClick={event => this.handleQualityClick(event, 70)}>70q</span>
              <span onClick={event => this.handleQualityClick(event, 80)}>80q</span>
              <span onClick={event => this.handleQualityClick(event, 90)}>90q</span>
              <span onClick={event => this.handleQualityClick(event, 100)}>100q</span>
            </div>
            <span className="marketListQualityDisplaySpan"> Quality: {this.state.quality}</span>
          </div>
          {list}
          <LoadingSpinner fetchState={this.props.fetchState} />
        </div>
    );
  }
}

let mapPropsFromStoreState = state => {
  return {
    items: state.items.itemData.present,
    buyState: state.buyState,
    sort: state.sort,
    fetchState: state.items.fetchState
  };
};

export default connect(mapPropsFromStoreState)(ItemList);
