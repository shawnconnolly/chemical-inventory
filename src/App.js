import React, { Component } from 'react';
import './App.css';
import NavigationItems from './Navigation/NavigationItems/NavigationItems'
import Rooms from './Rooms/Rooms'
import Chemicals from './Chemicals/Chemicals';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavigationItems></NavigationItems>
          <Switch>
            <Route path="/chemicals" component={Chemicals} />
            <Route path="/" exact component={Rooms} />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
