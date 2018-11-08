import React from 'react';
import App from './App';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import RoomsReducer from './Store/Reducers/Rooms';
import AuthReducer from './Store/Reducers/Auth';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('app tests', () => {
  it('renders without crashing', () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const rootReducer = combineReducers({
      rooms: RoomsReducer,
      auth: AuthReducer
    });

    const store = createStore(rootReducer, composeEnhancers(
      applyMiddleware(thunk)
    ));

    const div = document.createElement('div');
    shallow(<Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>);
  })

});
