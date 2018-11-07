import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './Auth';
import expect from 'expect';
import mockAxios from 'jest-mock-axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
});

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

test('logout test should clear local storage', () => {
    const store = mockStore({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    });
    store.dispatch(actions.logout());
    expect(localStorage.removeItem).toHaveBeenCalledTimes(3);
});

test('signin saves token', () => {
    const store = mockStore({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    });

    const authData = {
        email: 'email',
        password: 'password',
        returnSecureToken: true
    };

    store.dispatch(actions.auth('email', 'password', false));
    expect(mockAxios.post).toHaveBeenCalledWith('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBiptXtAZPsUC-M_vLkEnNkeBYwtGbuAFg', authData);

    let responseObj = { data: {
        idToken: '1',
        expiresIn:'3600',
        localId: '2'
    } };
    mockAxios.mockResponse(responseObj);
    expect(localStorage.setItem).toHaveBeenCalledTimes(3);
})