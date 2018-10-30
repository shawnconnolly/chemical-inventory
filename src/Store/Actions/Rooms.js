import * as actionTypes from './actionTypes'
import axios from '../../axios-rooms';

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

export const save = (rooms, token) => {
    return dispatch => {
        axios.put( '/rooms.json?auth=' + token, rooms )
            .then( response => {
                console.log( response.data );
            } )
            .catch( error => {
                console.log(error);
            } );
    };
};

export const fetchRoomsSuccess = ( rooms ) => {
    return {
        type: actionTypes.FETCH_ROOMS_SUCCESS,
        rooms: rooms
    };
};

export const load = (token) => {
    return dispatch => {
        axios.get( '/rooms.json?auth=' + token)
            .then( response => {
                console.log(response.data);
                dispatch(fetchRoomsSuccess(response.data));
            } )
            .catch( err => {
                console.log(err);
            } );
    };
};