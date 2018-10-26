import { updateObject } from '../utility';
import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    rooms: [{ name: "103", location: "North Building" },
    { name: "104", location: "North Building" }],
    roomName: '',
    roomLocation: '',
    selectedRoom: -1
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

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_ROOM: return addRoom( state, action );
        case actionTypes.REMOVE_ROOM: return removeRoom(state, action);
        case actionTypes.EDIT_ROOM: return editRoom(state, action);    
        case actionTypes.SELECT_ROOM: return selectRoom(state, action);
        case actionTypes.UPDATE_ROOM_NAME: return roomNameUpdated(state, action);
        case actionTypes.UPDATE_LOCATION_NAME: return roomLocationUpdated(state, action);
        default: return state;
    }
};

export default reducer;