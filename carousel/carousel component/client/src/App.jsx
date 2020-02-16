import React from 'react';
import axios from 'axios';
import CarouselRelated from './components/CarouselRelated.jsx';
import CarouselVisited from './components/CarouselVisited.jsx';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data : [], //currently unused but populates with all of the data in DB
      classIncrement : 0,
      classIncrementViewed : 0,
      selection: [],
      selectionViewed: []
    }

    this.handleLeft = this.handleLeft.bind(this)
    this.handleRight = this.handleRight.bind(this)
    this.handleLeftViewed = this.handleLeftViewed.bind(this)
    this.handleRightViewed = this.handleRightViewed.bind(this)
    this.getRelatedItems = this.getRelatedItems.bind(this)
    this.getClickedItem = this.getClickedItem.bind(this)
  }

  componentDidMount(){
    this.fetchAllData()
    window.addEventListener('jordanAwesome', e => {
      this.getRelatedItems(e)
      this.getClickedItem(e)
    })
  }

  handleLeft(){
    console.log('%c wooWEE don\'t change my CODE or there\'ll be hell to pay', 'font-size: 40; color: yellow;');
    if(this.state.classIncrement > 0){
      this.setState({classIncrement : this.state.classIncrement-=1})
    }
  }
  handleRight(){
    console.image('https://cdn.betterttv.net/emote/56f24cba51361dbf34724454/3x');
    console.table(["woooo", "weeeeeee", "!!!!"]);
    if((this.state.classIncrement) < (this.state.data.length / 2)){
      this.setState({classIncrement : this.state.classIncrement+=1})
    }
  }
  handleLeftViewed(){
    console.image('https://cdn.betterttv.net/emote/55a4499426b81c7c1108f169/3x');
    if(this.state.classIncrementViewed > 0){
      this.setState({classIncrementViewed : this.state.classIncrementViewed-=1})
    }
  }
  handleRightViewed(){
    console.image('https://cdn.betterttv.net/emote/5acdc7cb31ca5d147369ead8/3x');
    console.image('https://cdn.betterttv.net/emote/57a42b904c090c1552d199cc/3x');
    if((this.state.classIncrementViewed) < (this.state.data.length / 2)){
      this.setState({classIncrementViewed : this.state.classIncrementViewed+=1})
    }
  }

  getClickedItem(e){
    axios.get('http://carousel.us-east-2.elasticbeanstalk.com/wowStuff/item', {
      params : {
        id : e.detail
      }
    }).then((response) => {
      // console.image('https://cdn.betterttv.net/emote/56f24cba51361dbf34724454/3x');
      console.log('here is a destructured console log --',{response})
      console.log('%c woooooWEEEEE', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113);')
      console.log('%c look at me %c this poopie butthole is huuuuuuuunGRY', 'color: red; font-weight: bold;', 'color: white; background-color: blue; font-size: 20px;')
      // console.trace()
      //check and see if item is already in carousel. if it isn't -->
      var isPopulated = false;
      for(let i = 0; i < this.state.selectionViewed.length; i++){
        if(this.state.selectionViewed[i].id === response.data[0].id){
          isPopulated = true;
          break;
        }
      }
      if(!isPopulated){
        let temp = this.state.selectionViewed.concat(response.data)
        this.setState({
          selectionViewed :temp,
          // classIncrementViewed : 0  --optional bounceback on search
        })
      }
    }).catch((err) => {
      console.log('something went wrong with fetching an item yo from database', err)})
  }

  getRelatedItems(e){
    // console.log('this is the detail -->', e.detail)
    let idThing = e.detail;
    axios.get('http://carousel.us-east-2.elasticbeanstalk.com/wowStuff/category', {
      params : {
        id: idThing
      }
    }).then((response) => {
      // console.log('this is the response from trying to get a category-->', response.data)
      console.image('https://cdn.betterttv.net/emote/5c5d92e639bfc5202398b49b/3x');
      let imageList = [];
      let randomNum = Math.floor(Math.random() * Math.floor(4));
      let endNum = 15;
      for(let i = randomNum; i < (randomNum + endNum); i ++){ //use random list of fifteen related items
        if(response.data[i].id !== idThing){
          imageList.push(response.data[i])
        } else {
          endNum+=1;
        }
      }
      this.setState({
        selection: imageList,
        // classIncrement: 0 --optional bounceback on search
      })
    })
  }

  fetchAllData(){ //gets all the data from DB
    axios.get('http://carousel.us-east-2.elasticbeanstalk.com/wowStuff').then((response) => {
      // console.log('this is the response from getting all the stuff --> ', response.data)
      console.image('https://cdn.betterttv.net/emote/56f24cba51361dbf34724454/3x');
      let imageList = [];
      for(let i = 0; i < 15; i++){
        imageList.push(response.data[i])
      }
      this.setState({
        data : response.data,
        selection: imageList
      })
    })
    .catch((err) => {
      console.log('something went wrong with fetching all data from database', err)
    })
  }

  render(){
    
    return (
      <div>
        <CarouselRelated
        classIncrement={this.state.classIncrement}
        handleLeft={this.handleLeft}
        handleRight={this.handleRight}
        selection={this.state.selection}
        />
        <CarouselVisited
        classIncrementViewed={this.state.classIncrementViewed}
        handleLeftViewed={this.handleLeftViewed}
        handleRightViewed={this.handleRightViewed}
        selectionViewed={this.state.selectionViewed}
        />
      </div>
    )
  }
}