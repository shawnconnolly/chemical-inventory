import React, { Component } from 'react';
import classes from './Rooms.module.css'

class Rooms extends Component {
    state = {
        rooms: [{ name: "103", location: "North Building" },
        { name: "104", location: "North Building" }],
        roomName: '',
        roomLocation: '',
        selectedRoom: -1
    };

    nameUpdated = (event) => {
        this.setState({ roomName: event.target.value });
    }

    locationUpdated = (event) => {
        this.setState({ roomLocation: event.target.value });
    }

    addRoom = (event) => {
        const rooms = [...this.state.rooms];
        rooms.push({ name: this.state.roomName, location: this.state.roomLocation })
        this.setState({
            rooms: rooms,
            roomName: '',
            roomLocation: '',
            selectedRoom: -1
        });
    }

    editSelected = (event) => {
        const rooms = [...this.state.rooms];
        rooms[this.state.selectedRoom] = { name: this.state.roomName, location: this.state.roomLocation };
        this.setState({
            rooms: rooms,
            roomName: '',
            roomLocation: '',
            selectedRoom: -1
        });
    }

    deleteSelected = (event) => {
        const rooms = [...this.state.rooms];
        rooms.splice(this.state.selectedRoom, 1);
        this.setState({
            rooms: rooms,
            roomName: '',
            roomLocation: '',
            selectedRoom: -1
        });
    }

    editRoomSelected = (index) => {
        console.dir('index: ' + index);
        const room = this.state.rooms[index];
        this.setState({
            roomName: room.name,
            roomLocation: room.location,
            selectedRoom: index
        });
    }

    render() {
        const listItems = this.state.rooms.map((room, index) =>
            <li className={classes.Rooms}
                key={index}
                onClick={() => this.editRoomSelected(index)}>{room.name} - {room.location}</li>
        );

        return (
            <div>
                <div>
                    <label for="name">Name</label>
                    <input type="text"
                        name="name"
                        className="form-control"
                        value={this.state.roomName}
                        onChange={(e) => this.nameUpdated(e)} />
                    <label for="location">Location</label>
                    <input type="text"
                        name="location"
                        className="form-control"
                        value={this.state.roomLocation}
                        onChange={(e) => this.locationUpdated(e)} />
                    <button class="btn btn-primary"
                        onClick={this.addRoom}
                        disabled={this.state.selectedRoom !== -1}>Add</button>
                    <button class="btn btn-primary"
                        disabled={this.state.selectedRoom === -1}
                        onClick={this.deleteSelected}>Remove</button>
                    <button class="btn btn-primary"
                        disabled={this.state.selectedRoom === -1}
                        onClick={this.editSelected}>Edit</button>
                </div>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default Rooms;