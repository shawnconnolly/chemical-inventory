import React, { Component } from 'react';
import classes from './Chemicals.module.scss'
import { connect } from 'react-redux';
import * as actions from '../Store/Actions/index';
import { Prompt } from 'react-router';
import { Button } from 'reactstrap';

class Chemicals extends Component {

    render() {
        let listItems = null;
        if (this.props.selectedRoom > -1 && this.props.rooms[this.props.selectedRoom].chemicals) {
            listItems = this.props.rooms[this.props.selectedRoom].chemicals.map((chemical, index) =>
                <li className={classes.Chemicals}
                    key={index}
                    onClick={() => this.props.onSelectChemical(index)}>{chemical.name}, {chemical.tradeName} - {chemical.quantity} {chemical.UoM}- {chemical.cabinet}</li>
            );
        }

        return (
            <div>
                <h2>{this.props.roomName}</h2>
                <h3>{this.props.roomLocation}</h3>
                <div>
                    <label htmlFor="name" className={classes.FormLabel}>Name</label>
                    <input type="text"
                        name="name"
                        className={classes.FormTextbox}
                        value={this.props.chemName}
                        onChange={(e) => this.props.onChemicalNameUpdated(e.target.value)} />
                    <label htmlFor="tradename" className={classes.FormLabel}>Trade Name</label>
                    <input type="text"
                        name="tradename"
                        className={classes.FormTextbox}
                        value={this.props.chemTradeName}
                        onChange={(e) => this.props.onChemicalTradeNameUpdated(e.target.value)} />
                    <label htmlFor="quantity" className={classes.FormLabel}>Quantity</label>
                    <input type="text"
                        name="quantity"
                        className={classes.FormTextbox}
                        value={this.props.chemQty}
                        onChange={(e) => this.props.onChemicalQtyUpdated(e.target.value)} />
                    <label htmlFor="uom" className={classes.FormLabel}>Unit of Measure</label>
                    <input type="text"
                        name="uom"
                        className={classes.FormTextbox}
                        value={this.props.chemQtyUoM}
                        onChange={(e) => this.props.onChemicalQtyUoMUpdated(e.target.value)} />
                    <label htmlFor="cabinet" className={classes.FormLabel}>Cabinet</label>
                    <input type="text"
                        name="cabinet"
                        className={classes.FormTextbox}
                        value={this.props.cabinet}
                        onChange={(e) => this.props.onChemicalCabinetUpdated(e.target.value)} />
                    <hr></hr>
                    <Button className="btn btn-primary"
                        onClick={() => this.props.onChemicalAdded({ name: this.props.chemName, tradeName: this.props.chemTradeName, quantity: this.props.chemQty, UoM: this.props.chemQtyUoM, cabinet: this.props.cabinet })}
                        disabled={this.props.selectedChemical !== -1}>Add</Button>
                    <Button className="btn btn-primary"
                        disabled={this.props.selectedChemical === -1}
                        onClick={() => this.props.onChemicalRemoved(this.props.selectedChemical)}>Remove</Button>
                    <Button className="btn btn-primary"
                        disabled={this.props.selectedChemical === -1}
                        onClick={() => this.props.onEditChemical({ name: this.props.chemName, tradeName: this.props.chemTradeName, quantity: this.props.chemQty, UoM: this.props.chemQtyUoM, cabinet: this.props.cabinet }, this.props.selectedChemical)}>Edit</Button>
                    <Button className="btn btn-primary"
                        onClick={() => this.props.onSave(this.props.rooms, this.props.token)}>Save Inventory</Button>
                    <Button className="btn btn-primary"
                        onClick={() => this.props.onLoad(this.props.token)}>Load Inventory</Button>
                </div>
                <ul>
                    {listItems}
                </ul>
                <Prompt when={this.props.selectedChemical !== -1 ||
                    this.props.chemName !== '' ||
                    this.props.chemTradeName !== '' ||
                    this.props.chemQty !== '' ||
                    this.props.chemQtyUoM !== '' ||
                    this.props.cabinet !== ''}
                    message="Are you sure you want to leave?" />
            </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        roomName: state.rooms.roomName,
        roomLocation: state.rooms.roomLocation,
        selectedRoom: state.rooms.selectedRoom,
        rooms: state.rooms.rooms,
        chemName: state.rooms.chemName,
        chemTradeName: state.rooms.chemTradeName,
        chemQty: state.rooms.chemQty,
        chemQtyUoM: state.rooms.chemQtyUoM,
        cabinet: state.rooms.cabinet,
        selectedChemical: state.rooms.selectedChemical,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChemicalAdded: (chemical) => dispatch(actions.addChemical(chemical)),
        onChemicalRemoved: (index) => dispatch(actions.removeChemical(index)),
        onEditChemical: (chemical, index) => dispatch(actions.editChemical(chemical, index)),
        onSelectChemical: (index) => dispatch(actions.selectChemical(index)),
        onChemicalNameUpdated: (value) => dispatch(actions.updateChemicalName(value)),
        onChemicalTradeNameUpdated: (value) => dispatch(actions.updateChemicalTradeName(value)),
        onChemicalQtyUpdated: (value) => dispatch(actions.updateChemicalQuantity(value)),
        onChemicalQtyUoMUpdated: (value) => dispatch(actions.updateChemicalUoM(value)),
        onChemicalCabinetUpdated: (value) => dispatch(actions.updateChemicalCabinet(value)),
        onSave: (rooms, token) => dispatch(actions.save(rooms, token)),
        onLoad: (token) => dispatch(actions.load(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chemicals);