import React from "react";
import axios from "axios";
import CarouselRelated from "./components/CarouselRelated.jsx";
import CarouselVisited from "./components/CarouselVisited.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      classIncrement: 0,
      classIncrementViewed: 0,
      selection: [],
      selectionViewed: []
    };

    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleLeftViewed = this.handleLeftViewed.bind(this);
    this.handleRightViewed = this.handleRightViewed.bind(this);
    this.getRelatedItems = this.getRelatedItems.bind(this);
    this.getClickedItem = this.getClickedItem.bind(this);
  }

  componentDidMount() {
    this.fetchAllData();
    // this.getRelatedItems();
    window.addEventListener("jordanAwesome", e => {
      this.getRelatedItems(e);
      this.getClickedItem(e);
    });
  }

  handleLeft() {
    if (this.state.classIncrement > 0) {
      this.setState({ classIncrement: (this.state.classIncrement -= 1) });
    }
  }
  handleRight() {
    if (this.state.classIncrement < this.state.data.length / 2) {
      this.setState({ classIncrement: (this.state.classIncrement += 1) });
    }
  }
  handleLeftViewed() {
    if (this.state.classIncrementViewed > 0) {
      this.setState({
        classIncrementViewed: (this.state.classIncrementViewed -= 1)
      });
    }
  }
  handleRightViewed() {
    if (this.state.classIncrementViewed < this.state.data.length / 2) {
      this.setState({
        classIncrementViewed: (this.state.classIncrementViewed += 1)
      });
    }
  }

  getClickedItem(e) {
    axios
      .get("/wowStuff/item", {
        params: {
          id: e ? e.detail : 1
        }
      })
      .then(response => {
        // console.log("getClickedItem", response.data);
        //check and see if item is already in carousel. if it isn't -->
        var isPopulated = false;
        for (let i = 0; i < this.state.selectionViewed.length; i++) {
          if (this.state.selectionViewed[i].id === response.data[0].id) {
            isPopulated = true;
            break;
          }
        }
        if (!isPopulated) {
          let temp = this.state.selectionViewed.concat(response.data);
          this.setState({
            selectionViewed: temp
            // classIncrementViewed : 0  --optional bounceback on search
          });
        }
      })
      .catch(err => {
        console.log(
          "something went wrong with fetching an item yo from database",
          err
        );
      });
  }

  getRelatedItems(e) {
    let idThing = e ? e.detail : ~~(Math.random() * 10000);
    console.log("getrelateditems", idThing);
    axios
      .get("/wowStuff/category", {
        params: {
          id: idThing
        }
      })
      .then(response => {
        let imageList = [];
        for (let i = 0; i < 15; i++) {
          //use random list of fifteen related items
          imageList.push(response.data[i]);
        }
        this.setState({
          selection: imageList
          // classIncrement: 0 --optional bounceback on search
        });
      });
  }

  fetchAllData() {
    //gets 15 records from the data from DB
    axios
      .get("/wowStuff")
      .then(response => {
        // console.log(response);
        let imageList = [];
        for (let i = 0; i < 15; i++) {
          response.data[i].image = "https://loremflickr.com/320/240";
          imageList.push(response.data[i]);
        }
        this.setState({
          data: response.data,
          // data: response.data.rows,
          selection: imageList
        });
      })
      .catch(err => {
        console.log(
          "something went wrong with fetching all data from database",
          err
        );
      });
  }

  render() {
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
    );
  }
}
