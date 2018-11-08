import React from 'react';
import Rooms from './Rooms';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount, spyOn } from 'enzyme';
import RoomsReducer from '../Store/Reducers/Rooms';
import AuthReducer from '../Store/Reducers/Auth';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sinon from 'sinon';

configure({ adapter: new Adapter() });
describe('Rooms tests', () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const rootReducer = combineReducers({
        rooms: RoomsReducer,
        auth: AuthReducer
    });

    const store = createStore(rootReducer, composeEnhancers(
        applyMiddleware(thunk)
    ));

    it('validateNameAndLocation should set valid combo to false if not unique', () => {
        const wrapper = shallow(<Rooms store={store} />);
        const instance = wrapper.dive().instance();
        expect(instance.validCombo).toBe(true);
        instance.validateNameAndLocation('103', 'North Building');
        expect(instance.validCombo).toBe(false);
    })

    it('viewChemicals should push chemicals on to history', () => {
        const historyMock = { push: jest.fn() };
        const wrapper = shallow(<Rooms store={store} history={historyMock} />);
        const instance = wrapper.dive().instance();

        instance.viewChemicals();
        expect(historyMock.push.mock.calls.length).toBe(1);
    })

})