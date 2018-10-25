import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationItems from './Navigation/NavigationItems/NavigationItems'
import Rooms from './Rooms/Rooms'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavigationItems></NavigationItems>
          <Rooms></Rooms>
        </header>
      </div>
    );
  }
}

export default App;
