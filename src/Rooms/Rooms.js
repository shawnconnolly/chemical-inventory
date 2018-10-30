import React, { Component } from 'react';
import classes from './Rooms.module.css'
import { connect } from 'react-redux';
import * as actions from '../Store/Actions/index';

class Rooms extends Component {
    validCombo = true;

    viewChemicals = () => {
        this.props.history.push('/chemicals');
    }

    validateUniqueNameLocationForNameUpdate(e) {
        this.props.onRoomNameUpdated(e.target.value);
        this.validateNameAndLocation(e.target.value, this.props.roomLocation);

    }

    validateUniqueNameLocationForLocationUpdate(e) {
        this.props.onRoomLocationUpdated(e.target.value);
        this.validateNameAndLocation(this.props.roomName, e.target.value);
    }

    validateNameAndLocation(name, location) {
        console.log('validating: ' + name + ' - ' + location);
        var newArray = this.props.rooms.filter(function (room) {
            return room.name === name &&
                room.location === location;
        });
        if (newArray.length !== 0) {
            this.validCombo = false;
        } else {
            this.validCombo = true;
        }
    }

    render() {
        this.props.onLoad(this.props.token);
        const listItems = this.props.rooms.map((room, index) =>
            <li className={classes.Rooms}
                key={index}
                onClick={() => this.props.onSelectRoom(index)}>{room.name} - {room.location}</li>
        );

        let invalidMessage = <p>Please provide unique name and location</p>
        if (this.validCombo) {
            invalidMessage = null;
        }

        return (
            <div>
                <div>
                    <label for="name">Name</label>
                    <input type="text"
                        name="name"
                        className="form-control"
                        value={this.props.roomName}
                        onChange={(e) => this.validateUniqueNameLocationForNameUpdate(e)} />
                    <label for="location">Location</label>
                    <input type="text"
                        name="location"
                        className="form-control"
                        value={this.props.roomLocation}
                        onChange={(e) => this.validateUniqueNameLocationForLocationUpdate(e)} />
                    {invalidMessage}
                    <hr></hr>
                    <button class="btn btn-primary"
                        onClick={() => this.props.onRoomAdded({ name: this.props.roomName, location: this.props.roomLocation, chemicals: [] })}
                        disabled={this.props.selectedRoom !== -1 || !this.validCombo}>Add</button>
                    <button class="btn btn-primary"
                        disabled={this.props.selectedRoom === -1}
                        onClick={() => this.props.onRoomRemoved(this.props.selectedRoom)}>Remove</button>
                    <button class="btn btn-primary"
                        disabled={this.props.selectedRoom === -1 || !this.validCombo}
                        onClick={() => this.props.onEditRoom({ name: this.props.roomName, location: this.props.roomLocation, chemicals: [] }, this.props.selectedRoom)}>Edit</button>
                    <button class="btn btn-primary"
                        disabled={this.props.selectedRoom === -1}
                        onClick={this.viewChemicals}>View Chemicals</button>
                </div>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        rooms: state.rooms,
        roomName: state.roomName,
        roomLocation: state.roomLocation,
        selectedRoom: state.selectedRoom,
        token: state.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRoomAdded: (room) => dispatch(actions.addRoom(room)),
        onRoomRemoved: (index) => dispatch(actions.removeRoom(index)),
        onEditRoom: (room, index) => dispatch(actions.editRoom(room, index)),
        onSelectRoom: (index) => dispatch(actions.selectRoom(index)),
        onRoomNameUpdated: (name) => dispatch(actions.updateRoomName(name)),
        onRoomLocationUpdated: (location) => dispatch(actions.updateRoomLocation(location)),
        onLoad: (token) => dispatch(actions.load(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
