import React, { Component } from 'react';
import ItemDisplayList from './itemDisplayList.js';

class FilterOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      filterCategory: '',
      viewType: 'list'
    }
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

  render(){
    return( <React.Fragment>
        <div className="databseFilterOptions">

          <div className="filterAndSortWrapper">

            <div className="filterBar">
              <i className="material-icons">
                filter_list
              </i>
              <input type="text" placeholder="Filter" value={this.state.filterText} onChange={this.handleFilterText}/>
            </div>

            <div className="sortBar">
              <i className="material-icons">
                sort
              </i>
              <ul onClick={this.handleCategoryClick} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className={this.state.showCategory ? 'unsel' : 'hide unsel'}>
                <li className="unsel"> {this.state.filterCategory ? this.state.filterCategory : 'All' }</li>
                <li >All</li>
                <li >General goods</li>
                <li>Tailor</li>
                <li>Builder's corner</li>
                <li>Herbalist</li>
                <li>Agriculture</li>
                <li>Food</li>
                <li>Armor</li>
              </ul>
            </div>

          </div>

          <div className="filterIconWrapper">
            <i className={this.state.viewType === 'list' ? 'filterHighlight material-icons filterIcon' : 'material-icons filterIcon'} onClick={event => this.setViewType(event, 'list')}>
              view_headline
            </i>
            <i className={this.state.viewType === 'bglist' ? 'filterHighlight material-icons filterIcon' : 'material-icons filterIcon'} onClick={event => this.setViewType(event, 'bglist')}>
              view_stream
            </i>
            <i className={this.state.viewType === 'module' ? 'filterHighlight material-icons filterIcon' : 'material-icons filterIcon'} onClick={event => this.setViewType(event, 'module')}>
              view_module
            </i>
          </div>
        </div>
        <ItemDisplayList params={this.getParams()} databaseView={this.props.databaseView}/>
      </React.Fragment>
  )}
}

export default FilterOptions;
