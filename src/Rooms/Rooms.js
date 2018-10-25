import React, { Component } from 'react';

class Rooms extends Component {
    render() {
        return (
            <div>
                <label for="name">Name</label>
                <input type="text" name="name" class="form-control"/>
                <label for="location">Location</label>
                <input type="text" name="location" class="form-control"/>
                <button class="btn btn-primary">Add</button>
            </div>
        );
    }
}

export default Rooms;