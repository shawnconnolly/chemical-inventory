import { updateObject } from '../utility';
import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    rooms: [{ name: "103", location: "North Building", chemicals: [{ name: 'glucose', tradeName: 'glucose', quantity: 250, UoM: 'mL', cabinet: 'southeast' },
    { name: 'sucrose', tradeName: 'sucrose', quantity: 250, UoM: 'mL', cabinet: 'southeast' }] },
    { name: "104", location: "North Building", chemicals: [{ name: 'glucose', tradeName: 'glucose', quantity: 250, UoM: 'mL', cabinet: 'southeast' },
    { name: 'sucrose', tradeName: 'sucrose', quantity: 250, UoM: 'mL', cabinet: 'southeast' }] }],
    roomName: '',
    roomLocation: '',
    selectedRoom: -1,
    chemName: '',
    chemTradeName: '',
    chemQty: '',
    chemQtyUoM: '',
    cabinet: '',
    selectedChemical: -1,
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const addRoom = (state, action) => {
    const rooms = [...state.rooms];
    rooms.push(action.room)
    const updatedState = {
        rooms: rooms,
        roomName: '',
        roomLocation: '',
        selectedRoom: -1
    };
    return updateObject( state, updatedState );
}

const editRoom = (state, action) => {
    const rooms = [...state.rooms];
    rooms[action.room] = action.index;
    const updatedState = {
        rooms: rooms,
        roomName: '',
        roomLocation: '',
        selectedRoom: -1
    };
    return updateObject( state, updatedState );
}

const removeRoom = (state, action) => {
    const rooms = [...state.rooms];
    rooms.splice(action.index, 1);
    const updatedState = {
        rooms: rooms,
        roomName: '',
        roomLocation: '',
        selectedRoom: -1
    };
    return updateObject( state, updatedState );
}

const fetchRoomsSuccess = ( state, action ) => {
    return updateObject( state, {
        rooms: action.rooms
    } );
};

const selectRoom = (state, action) => {
    const room = state.rooms[action.index];
    const updatedState = {
        roomName: room.name,
        roomLocation: room.location,
        selectedRoom: action.index
    };
    return updateObject( state, updatedState );
}

const roomNameUpdated = (state, action) => {
    const updatedState = { roomName: action.name };
    return updateObject( state, updatedState );
}

const roomLocationUpdated = (state, action) => {
    const updatedState = { roomLocation: action.location };
    return updateObject( state, updatedState );
}

const chemNameUpdated = (state, action) => {
    const updatedState = { chemName: action.value };
    return updateObject(state, updatedState);
}
const chemTradeNameUpdated = (state, action) => {
    const updatedState = { chemTradeName: action.value };
    return updateObject(state, updatedState);
}
const chemQtyUpdated = (state, action) => {
    const updatedState = { chemQty: action.value };
    return updateObject(state, updatedState);
}
const chemUoMUpdated = (state, action) => {
    const updatedState = { chemQtyUoM: action.value };
    return updateObject(state, updatedState);
}
const cabinetUpdated = (state, action) => {
    const updatedState = { cabinet: action.value };
    return updateObject(state, updatedState);
}

const addChemical = (state, action) => {
    const chemicals = [...state.rooms[state.selectedRoom].chemicals];
    chemicals.push(action.chemical);
    const rooms = [...state.rooms];
    rooms[state.selectedRoom].chemicals = chemicals;
    const updatedState = {
        rooms: rooms,
        chemName: '',
        chemTradeName: '',
        chemQty: '',
        chemQtyUoM: '',
        cabinet: '',
        selectedChemical: -1
    };
    return updateObject(state, updatedState);
}

const selectChemical = (state, action) => {
    const chemical = state.rooms[state.selectedRoom].chemicals[action.index];
    const updatedState = {
        chemName: chemical.name,
        chemTradeName: chemical.tradeName,
        chemQty: chemical.quantity,
        chemQtyUoM: chemical.UoM,
        cabinet: chemical.cabinet,
        selectedChemical: action.index
    };
    return updateObject(state, updatedState);
}

const editChemical = (state, action) => {
    const rooms = [...state.rooms];
    const chemicals = [...state.rooms[state.selectedRoom].chemicals];

    chemicals[action.index] = {
        name: state.chemName,
        tradeName: state.chemTradeName,
        quantity: state.chemQty,
        UoM: state.chemQtyUoM,
        cabinet: state.cabinet
    };
    rooms[state.selectedRoom].chemicals = chemicals;
    const updatedState = {
        rooms: rooms,
        chemName: '',
        chemTradeName: '',
        chemQty: '',
        chemQtyUoM: '',
        cabinet: '',
        selectedChemical: -1
    };
    return updateObject(state, updatedState);
}

const removeChemical = (state, action) => {
    const chemicals = [...state.rooms[state.selectedRoom].chemicals];
    chemicals.splice(state.selectedChemical, 1);
    const rooms = [...state.rooms];
    rooms[state.selectedRoom].chemicals = chemicals;
    const updatedState = {
        rooms: rooms,
        chemName: '',
        chemTradeName: '',
        chemQty: '',
        chemQtyUoM: '',
        cabinet: '',
        selectedChemical: -1
    };
    return updateObject(state, updatedState);
}

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const save = ( state, action ) => {
    return updateObject( state, state );
};

const load = ( state, action ) => {
    return updateObject( state, state );
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}


const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_ROOM: return addRoom( state, action );
        case actionTypes.REMOVE_ROOM: return removeRoom(state, action);
        case actionTypes.EDIT_ROOM: return editRoom(state, action);    
        case actionTypes.SELECT_ROOM: return selectRoom(state, action);
        case actionTypes.UPDATE_ROOM_NAME: return roomNameUpdated(state, action);
        case actionTypes.UPDATE_LOCATION_NAME: return roomLocationUpdated(state, action);
        case actionTypes.SAVE: return save(state, action);
        case actionTypes.LOAD: return load(state, action);
        case actionTypes.FETCH_ROOMS_SUCCESS: return fetchRoomsSuccess(state, action);

        case actionTypes.ADD_CHEMICAL: return addChemical(state, action);
        case actionTypes.EDIT_CHEMICAL: return editChemical(state, action);
        case actionTypes.REMOVE_CHEMICAL: return removeChemical(state, action);
        case actionTypes.SELECT_CHEMICAL: return selectChemical(state, action);
        case actionTypes.UPDATE_CHEMICAL_NAME: return chemNameUpdated(state, action);
        case actionTypes.UPDATE_CHEMICAL_TRADE_NAME: return chemTradeNameUpdated(state, action);
        case actionTypes.UPDATE_CHEMICAL_QUANTITY: return chemQtyUpdated(state, action);
        case actionTypes.UPDATE_CHEMICAL_UOM: return chemUoMUpdated(state, action);
        case actionTypes.UPDATE_CABINET_NAME: return cabinetUpdated(state, action);

        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default: return state;
    }
};

export default reducer;