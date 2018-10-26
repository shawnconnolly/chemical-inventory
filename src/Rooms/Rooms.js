import React, { Component } from 'react';
import classes from './Rooms.module.css'
import { connect } from 'react-redux';
import * as actions from '../Store/Actions/index';

class Rooms extends Component {

    viewChemicals = () => {
        this.props.history.push('/chemicals');
    }

    render() {
        const listItems = this.props.rooms.map((room, index) =>
            <li className={classes.Rooms}
                key={index}
                onClick={() => this.props.onSelectRoom(index)}>{room.name} - {room.location}</li>
        );

        return (
            <div>
                <div>
                    <label for="name">Name</label>
                    <input type="text"
                        name="name"
                        className="form-control"
                        value={this.props.roomName}
                        onChange={(e) => this.props.onRoomNameUpdated(e.target.value)} />
                    <label for="location">Location</label>
                    <input type="text"
                        name="location"
                        className="form-control"
                        value={this.props.roomLocation}
                        onChange={(e) => this.props.onRoomLocationUpdated(e.target.value)} />
                        <hr></hr>
                    <button class="btn btn-primary"
                        onClick={() => this.props.onRoomAdded({name:this.props.roomName,location:this.props.roomLocation})}
                        disabled={this.props.selectedRoom !== -1}>Add</button>
                    <button class="btn btn-primary"
                        disabled={this.props.selectedRoom === -1}
                        onClick={() => this.props.onRoomRemoved(this.props.selectedRoom)}>Remove</button>
                    <button class="btn btn-primary"
                        disabled={this.props.selectedRoom === -1}
                        onClick={() => this.props.onEditRoom({name:this.props.roomName,location:this.props.roomLocation}, this.props.selectedRoom)}>Edit</button>
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
        selectedRoom: state.selectedRoom
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRoomAdded: (room) => dispatch(actions.addRoom(room)),
        onRoomRemoved: (index) => dispatch(actions.removeRoom(index)),
        onEditRoom: (room, index) => dispatch(actions.editRoom(room, index)),
        onSelectRoom: (index) => dispatch(actions.selectRoom(index)),
        onRoomNameUpdated: (name) => dispatch(actions.updateRoomName(name)),
        onRoomLocationUpdated: (location) => dispatch(actions.updateRoomLocation(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
