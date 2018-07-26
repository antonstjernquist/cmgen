import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreateItem, actionCreateMessage, actionUpdateMessages} from '../actions/actions.js';
import Expandbutton from './expandbutton.js';
import { printMessage } from './globalfunctions.js';

/* Fetch */

/* URL EXAMPLE WORKING: https://lifeisfeudal.gamepedia.com/api.php?action=query&titles=thin_leather&prop=pageimages&format=json&pithumbsize=100 */
/* ID: https://lifeisfeudal.gamepedia.com/api.php?action=query&prop=revisions|&rvprop=content&format=json&titles=thin_leather */

const AddCategoryButton = props => {
  if(props.length < 5){
    return (
      <button className="ctaButton addCategoryButton" onClick={props.addCategory}> + </button>
    )
  } else return null
}

const ExtendedCategories = props => {
  if(props.show){
    let list = props.list.map((x, index) => {
      console.log('Index = ', index);
      return (
        <div className="subCategoryDiv">
          <input key={index + ':'} placeholder={'Category (' + (index + 1) + ')'} onChange={event => props.handleChange(event, index)} value={props.list[index]}/>
          <i onClick={event => props.removeCategory(event, index - 0)} className="material-icons">
            {props.list.length > 1 ? 'clear' : null}
          </i>
        </div>
      )
    })
    return (
      <div className="extendedCategories">
        <span> Sub categories </span>
        {list}
        <AddCategoryButton length={props.list.length} addCategory={props.addCategory}/>
      </div>
    )
  } else return null;
}


class ExtendedAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameValue: '',
      idValue: '',
      priceValue: '',
      imgurlValue: '',
      categoryValue: '',
      extendedCategories: false,
      categories: [''],
      buy: {},
      sell: {}
    }
  }

  componentDidMount = () =>{
    if(this.props.page){
      console.log('Page is defined. Running handlePage');
      this.handlePage(this.props.page, true);
    }
    console.log('extendedAdd mounted!');
  }


  handleAddItemClick = event => {
    /* Ip here */
    /* http://www.geoplugin.net/json.gp */

    let item = {
      name: this.state.nameValue,
      id: this.state.idValue - 0,
      imageurl: this.state.imgurlValue,
      main_category: this.state.categoryValue,
      categories: this.state.categories,
      prices: {
        buy: this.state.buy,
        sell: this.state.sell
      }
    }

    /* Check the item */
    if(checkItem(item, this.props.dispatch)){
      this.props.dispatch(actionCreateItem(item));
      printMessage('Successfully created a new item!', 'Success');
    } else {
      console.log('This item does not fulfill all requirements.');
    }
  }

  handleChange = (event, type) => {
    switch (type) {
      case 'NAME':
        return this.setState({nameValue: event.target.value});
      case 'IMGURL':
        return this.setState({imgurlValue: event.target.value});
      case 'ID':
        return this.setState({idValue: event.target.value});
      case 'PRICE':
        return this.setState({priceValue: event.target.value});
      case 'CATEGORY':
        return this.setState({categoryValue: event.target.value});
      default:
        return console.log('None!');
    }
  }

  handlePage = (page, forceUpdate = false) => {

    /* Return instantly if not requested, forceUpdate is only true when called from componentDidMount */
    if(!this.props.update && !forceUpdate){
      console.log('Not updating.');
      return;
    }

    /* Set revision */
    let rev = page.revisions[0];

    /* Create text */
    let text = rev[Object.keys(rev)[0]];
    rev = rev['*'];
    /* Stringify it */
    text = JSON.stringify(rev);

    /* Get the ID */
    let id = text.split('| id = ');

    /* Slice it out from the second item in the array */
    id = id[1].slice(0, 10);
    id = id.split('\\n')[0];

    /* Check thumbnail, if we didn't find any and we're not fetching, lets try to get it through imageinfo */
    let thumbnail = this.props.page.image ? this.props.page.image : page.thumbnail.source;

    let list = page.categories.map(x => {
      return x.title.split('Category:')[1];
    })

    let category = decideMainCategory(list);

    this.setState({
      nameValue: page.title,
      idValue: id,
      imgurlValue: thumbnail,
      categories: list,
      categoryValue: category
    });

    this.props.setNameValue(page.title);

    this.props.setUpdateStatus(false);
  }

  handleUpdateClick = event => {
    this.setState({update: !this.state.update});
  }

  handleExtendedCategories = (event, index) => {

    let list = [...this.state.categories];
    list.splice(index, 1, event.target.value)

    this.setState({categories: list});

  }

  addCategory = () => {
    let list = this.state.categories;
    list.push('');
    this.setState({categories: list});
  }
  removeCategory = (event, index) => {
    let newList = [...this.state.categories];
    newList.splice(index, 1);
    this.setState({categories: newList});
  }

  handlePriceChange = (event, quality, action) => {
    switch (quality) {
      case 50:
        if(action === 'buy'){
          this.setState({buy: {...this.state.buy, 50: event.target.value}});
        } else {
          this.setState({sell: {...this.state.sell, 50: event.target.value}});
        }
        break;
      case 60:
        if(action === 'buy'){
          this.setState({buy: {...this.state.buy, 60: event.target.value}});
        } else {
          this.setState({sell: {...this.state.sell, 60: event.target.value}});
        }
        break;
      case 70:
        if(action === 'buy'){
          this.setState({buy: {...this.state.buy, 70: event.target.value}});
        } else {
          this.setState({sell: {...this.state.sell, 70: event.target.value}});
        }
        break;
      case 80:
        if(action === 'buy'){
          this.setState({buy: {...this.state.buy, 80: event.target.value}});
        } else {
          this.setState({sell: {...this.state.sell, 80: event.target.value}});
        }
        break;
      case 90:
        if(action === 'buy'){
          this.setState({buy: {...this.state.buy, 90: event.target.value}});
        } else {
          this.setState({sell: {...this.state.sell, 90: event.target.value}});
        }
        break;
      case 100:
        if(action === 'buy'){
          this.setState({buy: {...this.state.buy, 100: event.target.value}});
        } else {
          this.setState({sell: {...this.state.sell, 100: event.target.value}});
        }
        break;
      default:
        return;
    }
  }

  render(){
    this.handlePage(this.props.page);
    if(this.props.page && !this.props.isFetching){
      return(
        <div className="extendedAdd">
          <div className="titleAndInputDiv">
            <span> Image url </span>
            <div className="categoryInputAndIcon">
              <input type="text" placeholder="Image url.." onChange={event => this.handleChange(event, 'IMGURL')} value={this.state.imgurlValue}/>
              <i className="material-icons imageUrlIcon">
                image
              </i>
              <img src={this.state.imgurlValue} alt="preview"/>
            </div>
          </div>

          <div className="idAndCategoryWrapper">
            <div className="titleAndInputDiv">
              <span> ID </span>
              <input type="number" placeholder="ID" onChange={event => this.handleChange(event, 'ID')} value={this.state.idValue}/>
            </div>

            <div className="titleAndInputDiv">
              <span> Category </span>
              <div className="categoryInputAndIcon">
                <input type="text" placeholder="Main category" onChange={event => this.handleChange(event, 'CATEGORY')} value={this.state.categoryValue}/>
                <span>({this.state.categories.length}) </span>
                <i onClick={this.handleUpdateClick} className="material-icons">
                  {this.state.update ? 'expand_less' : 'expand_more' }
                </i>
              </div>
            </div>
          </div>

          <ExtendedCategories removeCategory={this.removeCategory} addCategory={this.addCategory} list={this.state.categories} handleChange={this.handleExtendedCategories} show={this.state.update}/>

          <div className="pricesDiv">
            <div className="pricesTitle">
              <span> Buy </span>
              <span> Prices </span>
              <span> Sell </span>
            </div>
            <ul className="priceList">
              <li>
                <input onChange={event => this.handlePriceChange(event, 50, 'buy')} value={this.state.buy['50']} type="number" placeholder="50"/>
                <span> 50 Q </span>
                <input onChange={event => this.handlePriceChange(event, 50, 'sell')} value={this.state.sell['50']} type="number" placeholder="50"/>
              </li>
              <li>
                <input onChange={event => this.handlePriceChange(event, 60, 'buy')} value={this.state.buy['60']} type="number" placeholder="60"/>
                <span> 60 Q </span>
                <input onChange={event => this.handlePriceChange(event, 60, 'sell')} value={this.state.sell['60']} type="number" placeholder="60"/>
              </li>
              <li>
                <input onChange={event => this.handlePriceChange(event, 70, 'buy')} value={this.state.buy['70']} type="number" placeholder="70"/>
                <span> 70 Q </span>
                <input onChange={event => this.handlePriceChange(event, 70, 'sell')} value={this.state.sell['70']} type="number" placeholder="70"/>
              </li>
              <li>
                <input onChange={event => this.handlePriceChange(event, 80, 'buy')} value={this.state.buy['80']} type="number" placeholder="80"/>
                <span> 80 Q </span>
                <input onChange={event => this.handlePriceChange(event, 80, 'sell')} value={this.state.sell['80']} type="number" placeholder="80"/>
              </li>
              <li>
                <input onChange={event => this.handlePriceChange(event, 90, 'buy')} value={this.state.buy['90']} type="number" placeholder="90"/>
                <span> 90 Q </span>
                <input onChange={event => this.handlePriceChange(event, 90, 'sell')} value={this.state.sell['90']}type="number" placeholder="90"/>
              </li>
              <li>
                <input onChange={event => this.handlePriceChange(event, 100, 'buy')} value={this.state.buy['100']} type="number" placeholder="100"/>
                <span> 100 Q </span>
                <input onChange={event => this.handlePriceChange(event, 100, 'sell')} value={this.state.sell['100']} type="number" placeholder="100"/>
              </li>
            </ul>
          </div>
          <button className="ctaButton" onClick={this.handleAddItemClick}> Create new item </button>
        </div>
      )
    } else return null;
  }
}


class Search extends Component {

  constructor(props){
    super(props);
    console.log('My props are: ', props);
    this.state = {
      inputValue: '',
      isFetching: false,
      page: null,
      update: false,
      expand: true
    }
  }

  setNameValue = val => {
    this.setState({inputValue: val});
  }
  updateMessages = () => {
    this.props.dispatch(actionUpdateMessages());
  }

  handleClick = () => {

    if(!this.state.inputValue){
      if(this.state.page){
        printMessage('No input value, clearing page', 'Warning');
        this.setState({page: null});
      } else {
        printMessage('No input value, can not fetch', 'Warning');
      }
      return;
    }
    let searchValue = this.state.inputValue.toLowerCase();
    let url = 'https://lifeisfeudal.gamepedia.com/api.php?&action=query&prop=revisions|categories|images|pageimages&rvprop=content&format=json&pithumbsize=100&titles=' + searchValue + '&origin=*';

    fetch(url)
    .then(res => {
      console.log('Result is: ', res);
      return res.text();
    })
    .then(json => {
      /* Origin fix */
      json = JSON.parse(json);

      let page = json.query.pages;
      page = page[Object.keys(page)[0]];
      console.log('Parsed: ', page);

      if(!page.revisions){
        printMessage('No item with that name was found.', 'error');
        this.setState({isFetching: false, page: null});
        return;
      }

      if(!page.thumbnail){
        console.log('WARNING: NO THUMBNAIL FOUND! Fetching again');


        let newurl = 'https://lifeisfeudal.gamepedia.com/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=' + (checkImages(page.images)) + '&origin=*'
        fetch(newurl)
        .then(res => {
          return res.text();
        })
        .then(json => {
          json = JSON.parse(json);
          /* Origin fix */
          let newPage = json.query.pages;
          newPage = newPage[Object.keys(newPage)[0]];

          console.log('Page is: ', page);
          console.log('Newpage is: ', newPage);
          printMessage('Item found!', 'Success');
          this.setState({page: {...page, image: newPage.imageinfo[0].url}, isFetching: false, update: true});
        })
      } else {
        printMessage('Item found!', 'Success');
        this.setState({page: page, isFetching: false, update: true});
      }
    })
    .catch(err => {
      printMessage('Err: ' + err, 'Error', 7000);
      this.setState({isFetching: false});
    })
    printMessage('Retrieving data..', 'Info')
    this.setState({isFetching: true});
  }

  increaseList = () => {
      this.setState({itemCounter: this.state.itemCounter + 1});
      console.log('State: ', this.state.itemCounter);
  }

  handleChange = event => {
    this.setState({inputValue: event.target.value});
  }
  handlePress = event => {
    if(event.key === 'Enter'){
      this.handleClick();
    }
  }
  setUpdateStatus = bool => {
    this.setState({update: bool});
  }
  toggleExpand = () => {
    this.setState({expand: !this.state.expand});
  }

  render() {
    if(this.state.expand){
      return (
          <div className="newItemDiv">

            <h1> New item </h1>
            <Expandbutton toggle={this.toggleExpand} val={this.state.expand}/>
            <div className="inputAndButtonHolder">
              <div className="nameInputDiv">
                <input type="text" placeholder="Name.." onKeyPress={this.handlePress} onChange={this.handleChange} value={this.state.inputValue}/>
                <i className="material-icons"> save_alt </i>
              </div>
              <button className="ctaButton" onClick={this.handleClick}> Search </button>
            </div>
            <p> {this.state.isFetching ? 'Retrieving..' : null} </p>
            <ExtendedAdd setNameValue={this.setNameValue} dispatch={this.props.dispatch} setUpdateStatus={this.setUpdateStatus} update={this.state.update} page={this.state.page} isFetching={this.state.isFetching}/>
          </div>
      );
    } else {
      return (
        <div className="newItemDiv">
          <h1> New item </h1>
          <Expandbutton toggle={this.toggleExpand} val={this.state.expand}/>
        </div>
      )
    }
  }
}


/* Functions */
function checkItem(item, dispatch) {
  console.log('Checking item: ', item);
  if(item.name && item.id && item.imageurl && item.main_category){
    if( (typeof item.name === 'string') || (typeof item.id === 'number') || (typeof item.imageurl === 'string')) {
      if(item.prices){
        let buysize = Object.keys(item.prices.buy).length;
        let sellsize = Object.keys(item.prices.sell).length;
        if(buysize === 6 && sellsize === 6){
          console.log('Success!');
          return true;
        } else {
          console.log('All price fields are not filled in correctly!')
          return false;
        }
      } else {
        console.log('Item.prices is not defined');
        return false;
      }
    } else {
      console.log('Typeof failed');
      console.log('Name: ', typeof item.name);
      console.log('ID: ', typeof item.id);
      return false;
    }
  } else {
    dispatch(actionCreateMessage('Some fields are missing. Make sure to fill in all required fields', 'Error'));
    console.log('Missing fields.');
    return false;
  }
}

function decideMainCategory(list) {
  console.log('Categories found are: ', list);

  if(list.includes('Leather')){
    return 'Tailor'
  } else if(list.includes('Cloth processed materials')){
    return 'Tailor'
  } else if(list.includes('Tools')){
    return 'General goods';
  } else if(list.includes('Ingame currency')){
    return 'Currency'
  } else if(list.includes('Inedible harvest')){
    return 'Agriculture'
  } else if(list.includes('Drinks')){
    return 'Food'
  } else {
    return ''
  }
}

/* Check images */
/* Check image to not be regional */
function checkImages(images) {

  /* If there's only one image */
  if(!images.length > 1) {
    return images[0].title;
  }

  let arrayOfBadImageNames = ['file:regional.png', 'file:full.png', 'file:regional.gif', 'file:full.gif'];

  for(let img of images){
    if(arrayOfBadImageNames.includes(img.title.toLowerCase())){
      console.log('You do not want this image..');
      console.log('Index of it: ', images.indexOf(img));
      images.splice(images.indexOf(img), 1);
    }
  }

  return images[0].title;
}

/* Map props from store */

let mapPropsFromStoreState = state => {
  return {
    value: state.value,
    list: state.list
  };
};

let storeStateExtendedAdd = state => {
  return {
    value: state.value
  }
}
connect(storeStateExtendedAdd)(ExtendedAdd)

export default connect(mapPropsFromStoreState)(Search);
