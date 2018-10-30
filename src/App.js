import React, { Component } from 'react';
import './App.css';
import NavigationItems from './Navigation/NavigationItems/NavigationItems'
import Rooms from './Rooms/Rooms'
import Chemicals from './Chemicals/Chemicals';
import Login from './Auth/Login'
import { Route, Switch } from 'react-router-dom';
import Logout from './Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavigationItems></NavigationItems>
          <Switch>
            <Route path="/chemicals" component={Chemicals} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Rooms} />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
