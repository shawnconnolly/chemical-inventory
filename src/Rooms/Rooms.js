import React, { Component } from 'react';
import classes from './Rooms.module.scss'
import { connect } from 'react-redux';
import * as actions from '../Store/Actions/index';
import { Button } from 'reactstrap';

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
        var newArray = this.props.rooms.filter((room) => {
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
                <div className={classes.FormContainer}>
                    <label htmlFor="name" className={classes.FormLabel}>Name</label>
                    <input type="text"
                        name="name"
                        className={classes.FormTextbox}
                        value={this.props.roomName}
                        onChange={(e) => this.validateUniqueNameLocationForNameUpdate(e)} />
                    <label htmlFor="location" className={classes.FormLabel}>Location</label>
                    <input type="text"
                        name="location"
                        className={classes.FormTextbox}
                        value={this.props.roomLocation}
                        onChange={(e) => this.validateUniqueNameLocationForLocationUpdate(e)} />
                    {invalidMessage}
                    <hr></hr>
                    <Button className="btn btn-primary"
                        onClick={() => this.props.onRoomAdded({ name: this.props.roomName, location: this.props.roomLocation, chemicals: [] })}
                        disabled={this.props.selectedRoom !== -1 || !this.validCombo}>Add</Button>
                    <Button className="btn btn-primary"
                        disabled={this.props.selectedRoom === -1}
                        onClick={() => this.props.onRoomRemoved(this.props.selectedRoom)}>Remove</Button>
                    <Button className="btn btn-primary"
                        disabled={this.props.selectedRoom === -1 || !this.validCombo}
                        onClick={() => this.props.onEditRoom({ name: this.props.roomName, location: this.props.roomLocation, chemicals: [] }, this.props.selectedRoom)}>Edit</Button>
                    <Button className="btn btn-primary"
                        disabled={this.props.selectedRoom === -1}
                        onClick={this.viewChemicals}>View Chemicals</Button>
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
        rooms: state.rooms.rooms,
        roomName: state.rooms.roomName,
        roomLocation: state.rooms.roomLocation,
        selectedRoom: state.rooms.selectedRoom,
        token: state.auth.token
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
