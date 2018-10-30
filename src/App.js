import React, { Component } from 'react';
import './App.css';
import NavigationItems from './Navigation/NavigationItems/NavigationItems'
import Rooms from './Rooms/Rooms'
import Chemicals from './Chemicals/Chemicals';
import Login from './Auth/Login'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Logout from './Auth/Logout/Logout';
import { connect } from 'react-redux';

class App extends Component {
  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )

    return (
      <div className="App">
        <header className="App-header">
          <NavigationItems></NavigationItems>
          <Switch>
            <PrivateRoute path="/chemicals" component={Chemicals} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Rooms} />
          </Switch>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.token !== null
  };
};

export default withRouter(connect( mapStateToProps)( App ));

