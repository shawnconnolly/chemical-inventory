import * as actionTypes from './actionTypes'

export const addRoom = ( room ) => {
    return {
        type: actionTypes.ADD_ROOM,
        room: room
    };
};

export const removeRoom = ( index ) => {
    return {
        type: actionTypes.REMOVE_ROOM,
        index: index
    };
};

export const editRoom = ( index, room ) => {
    return {
        type: actionTypes.EDIT_ROOM,
        index: index,
        room: room
    };
};

export const selectRoom = ( index ) => {
    return {
        type: actionTypes.SELECT_ROOM,
        index: index
    };
};

export const updateRoomName = ( name ) => {
    return {
        type: actionTypes.UPDATE_ROOM_NAME,
        name: name
    };
};

export const updateRoomLocation = ( location ) => {
    return {
        type: actionTypes.UPDATE_LOCATION_NAME,
        location: location
    };
};