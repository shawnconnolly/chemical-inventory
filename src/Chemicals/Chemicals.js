import React, { Component } from 'react';
import classes from './Chemicals.module.css'
import { connect } from 'react-redux';
import * as actions from '../Store/Actions/index';

class Chemicals extends Component {



    render() {
        const pleaseSelect = (<p>Please Select a Room!</p>);
        let listItems = null;
        if (this.props.selectedRoom > -1) {
            listItems = this.props.rooms[this.props.selectedRoom].chemicals.map((chemical, index) =>
                <li className={classes.Chemicals}
                    key={index}
                    onClick={() => this.props.onSelectChemical(index)}>{chemical.name} - {chemical.cabinet}</li>
            );
        }

        return (
            <div>
                <h1>{this.props.roomName}</h1>
                <h2>{this.props.roomLocation}</h2>
                <div className="classes.Chemicals">
                    <label for="name">Name</label>
                    <input type="text"
                        name="name"
                        className="form-control"
                        value={this.props.chemName}
                        onChange={(e) => this.props.onChemicalNameUpdated(e.target.value)} />
                    <label for="tradename">Trade Name</label>
                    <input type="text"
                        name="tradename"
                        className="form-control"
                        value={this.props.chemTradeName}
                        onChange={(e) => this.props.onChemicalTradeNameUpdated(e.target.value)} />
                    <label for="quantity">Quantity</label>
                    <input type="text"
                        name="quantity"
                        className="form-control"
                        value={this.props.chemQty}
                        onChange={(e) => this.props.onChemicalQtyUpdated(e.target.value)} />
                    <label for="uom">Unit of Measure</label>
                    <input type="text"
                        name="uom"
                        className="form-control"
                        value={this.props.chemQtyUoM}
                        onChange={(e) => this.props.onChemicalQtyUoMUpdated(e.target.value)} />
                    <label for="cabinet">Cabinet</label>
                    <input type="text"
                        name="cabinet"
                        className="form-control"
                        value={this.props.cabinet}
                        onChange={(e) => this.props.onChemicalCabinetUpdated(e.target.value)} />
                    <hr></hr>
                    <button class="btn btn-primary"
                        onClick={() => this.props.onChemicalAdded({ name: this.props.chemName, tradeName: this.props.chemTradeName, quantity: this.props.chemQty, UoM: this.props.chemQtyUoM, cabinet: this.props.cabinet })}
                        disabled={this.props.selectedChemical !== -1}>Add</button>
                    <button class="btn btn-primary"
                        disabled={this.props.selectedChemical === -1}
                        onClick={() => this.props.onChemicalRemoved(this.props.selectedChemical)}>Remove</button>
                    <button class="btn btn-primary"
                        disabled={this.props.selectedChemical === -1}
                        onClick={() => this.props.onEditChemical({ name: this.props.chemName, tradeName: this.props.chemTradeName, quantity: this.props.chemQty, UoM: this.props.chemQtyUoM, cabinet: this.props.cabinet },this.props.selectedChemical)}>Edit</button>
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
        roomName: state.roomName,
        roomLocation: state.roomLocation,
        selectedRoom: state.selectedRoom,
        rooms: state.rooms,
        chemName: state.chemName,
        chemTradeName: state.chemTradeName,
        chemQty: state.chemQty,
        chemQtyUoM: state.chemQtyUoM,
        cabinet: state.cabinet,
        selectedChemical: state.selectedChemical
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
        onChemicalCabinetUpdated: (value) => dispatch(actions.updateChemicalCabinet(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chemicals);