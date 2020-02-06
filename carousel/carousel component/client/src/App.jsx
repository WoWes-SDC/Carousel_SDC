import React from 'react';
import axios from 'axios';
import Item from './components/Item.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data : [],
      classIncrement : 0,
      selection: []
    }

    this.handleLeft = this.handleLeft.bind(this)
    this.handleRight = this.handleRight.bind(this)
    this.getRelatedItems = this.getRelatedItems.bind(this)
  }

  handleLeft(){
    if(this.state.classIncrement > 0){
      this.setState({classIncrement : this.state.classIncrement-=1})
    }
  }
  handleRight(){
    if((this.state.classIncrement) < (this.state.data.length / 2)){
      this.setState({classIncrement : this.state.classIncrement+=1})
    }
  }

  componentDidMount(){
    this.fetchAllData()
    window.addEventListener('jordanAwesome', this.getRelatedItems)
  }

  getRelatedItems(e){
    console.log('this is the detail -->', e.detail)
    let idThing = e.detail;
    axios.get('http://carousel.us-east-2.elasticbeanstalk.com/wowStuff/category', {
      params : {
        id: idThing
      }
    }).then((response) => {
      console.log('this is the response from trying to get a category from dispatch -->', response.data)
    })
  }

  fetchAllData(){
    axios.get('http://carousel.us-east-2.elasticbeanstalk.com/wowStuff').then((response) => {
      console.log('this is the response from getting all the stuff --> ', response.data)
      let tenList = [];
      for(let i = 0; i < 15; i ++){
        tenList.push(response.data[i])
      }
      this.setState({
        data : response.data,
        selection: tenList
      })
    })
    .catch((err) => {
      console.log('something went wrong with fetching all data from database', err)
    })
  }

  render(){
    
    return (
      <div>
        <h2 className="talign-center th2">Related Items</h2>
     
        <div className= 'tcontainer'>

          <button className={'tleftButton' + (this.state.classIncrement === 0 ? ' thide' : '')} onClick={this.handleLeft}><FontAwesomeIcon icon="angle-left" /></button>

          <button className={"trightButton" + (this.state.classIncrement + 2 > this.state.selection.length /2 ? ' thide' : '')} onClick={this.handleRight}><FontAwesomeIcon icon="angle-right" /></button>

          <div className={'tniceRow' + ` transformLeft${this.state.classIncrement}`}>

            {this.state.selection.map((item) => 
            <div key={item.id} ><Item name={item.name} image={item.image} itemId={item.id} category={item.category} rating={item.rating} /></div>
            )}

          </div>
        </div>
      </div>
    )
  }
}