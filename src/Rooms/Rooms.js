import React, { Component } from 'react';

class Rooms extends Component {
    state = {
        Rooms: [{ name: "103", location: "North Building" },
        { name: "104", location: "North Building" }],
        roomName: '',
        roomLocation: ''
    };



    nameUpdated = (event) => {
        event.persist();
        console.log(event);
        this.setState({roomName : event.target.value});
        
    }

    render() {
        const listItems = this.state.Rooms.map((room) =>
            <li key={room.name}>{room.name} - {room.location}</li>
        );

        return (
            <div>
                <div>
                    <label for="name">Name</label>
                    <input type="text" name="name" className="form-control" onChange={(e) => this.nameUpdated(e)} />
                    <p>{this.state.roomName}</p>
                    <label for="location">Location</label>
                    <input type="text" name="location" className="form-control" />
                    <button class="btn btn-primary" onClick={this.addRoom}>Add</button>
                    <button class="btn btn-primary">Remove</button>
                    <button class="btn btn-primary">Edit</button>
                </div>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default Rooms;