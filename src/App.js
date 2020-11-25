import React, { Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoading: false
    }
  }

  componentDidMount() {
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>console.log(json))
    .then(json=> {
      this.setState({
        isLoading: true,
        items: json,
      })
    })
  }

  render() {

    var {isLoading, items} = this.state;

    if (!isLoading) {
      return <div>Loading...</div>
    }
 
    else {
      
      return (
        <div className="App">
          Data has been loaded
        </div>
      );
    }

  } 



}

export default App;
