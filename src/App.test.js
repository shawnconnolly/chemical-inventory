import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import RoomsReducer from './Store/Reducers/Rooms';
import AuthReducer from './Store/Reducers/Auth';

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
  ReactDOM.render((<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>), div);
  ReactDOM.unmountComponentAtNode(div);
});
