import React, { Component } from 'react';
import classes from './Chemicals.module.css'

class Chemicals extends Component {
    state = {
        chemicals: [{ name: 'glucose', tradeName: 'glucose', quantity: 250, UoM: 'mL', cabinet: 'southeast' },
        { name: 'sucrose', tradeName: 'sucrose', quantity: 250, UoM: 'mL', cabinet: 'southeast' }],
        chemName: '',
        chemTradeName: '',
        chemQty: '',
        chemQtyUoM: '',
        cabinet: '',
        selectedChemical: -1
    }
    chemNameUpdated = (event) => {
        this.setState({ chemName: event.target.value });
    }
    chemTradeNameUpdated = (event) => {
        this.setState({ chemTradeName: event.target.value });
    }
    chemQtyUpdated = (event) => {
        this.setState({ chemQty: event.target.value });
    }
    chemUoMUpdated = (event) => {
        this.setState({ chemQtyUoM: event.target.value });
    }
    cabinetUpdated = (event) => {
        this.setState({ cabinet: event.target.value });
    }

    addChemical = (event) => {
        const chemicals = [...this.state.chemicals];
        chemicals.push({ name: this.state.chemName, 
                         tradeName: this.state.chemTradeName,
                         quantity: this.state.chemQty, 
                         UoM: this.state.chemQtyUoM, 
                         cabinet: this.state.cabinet })
        this.setState({
            chemicals: chemicals,
            chemName: '',
            chemTradeName: '',
            chemQty: '',
            chemQtyUoM: '',
            cabinet: '',
            selectedChemical: -1
        });
    }

    chemicalSelected = (index) => {
        const chemical = this.state.chemicals[index];
        this.setState({
            chemName: chemical.name, 
            chemTradeName: chemical.tradeName,
            chemQty: chemical.quantity, 
            chemQtyUoM: chemical.UoM, 
            cabinet: chemical.cabinet ,
            selectedChemical: index
        });
    }

    editSelected = (event) => {
        const chemicals = [...this.state.chemicals];
        chemicals[this.state.selectedChemical] = { name: this.state.chemName, 
            tradeName: this.state.chemTradeName,
            quantity: this.state.chemQty, 
            UoM: this.state.chemQtyUoM, 
            cabinet: this.state.cabinet };
        this.setState({
            chemicals: chemicals,
            chemName: '',
            chemTradeName: '',
            chemQty: '',
            chemQtyUoM: '',
            cabinet: '',
            selectedChemical: -1
        });
    }

    deleteSelected = (event) => {
        const chemicals = [...this.state.chemicals];
        chemicals.splice(this.state.selectedChemical, 1);
        this.setState({
            chemicals: chemicals,
            chemName: '',
            chemTradeName: '',
            chemQty: '',
            chemQtyUoM: '',
            cabinet: '',
            selectedChemical: -1
        });
    }

    render() {

        const listItems = this.state.chemicals.map((chemical, index) =>
            <li className={classes.Chemicals}
                key={index}
            onClick={() => this.chemicalSelected(index)}>{chemical.name} - {chemical.cabinet}</li>
        );

        return (
            <div>
                <div className="classes.Chemicals">
                    <label for="name">Name</label>
                    <input type="text"
                        name="name"
                        className="form-control"
                        value={this.state.chemName}
                        onChange={(e) => this.chemNameUpdated(e)} />
                    <label for="tradename">Trade Name</label>
                    <input type="text"
                        name="tradename"
                        className="form-control"
                        value={this.state.chemTradeName}
                        onChange={(e) => this.chemTradeNameUpdated(e)} />
                    <label for="quantity">Quantity</label>
                    <input type="text"
                        name="quantity"
                        className="form-control"
                        value={this.state.chemQty}
                        onChange={(e) => this.chemQtyUpdated(e)} />
                    <label for="uom">Unit of Measure</label>
                    <input type="text"
                        name="uom"
                        className="form-control"
                        value={this.state.chemQtyUoM}
                        onChange={(e) => this.chemUoMUpdated(e)} />
                    <label for="cabinet">Cabinet</label>
                    <input type="text"
                        name="cabinet"
                        className="form-control"
                        value={this.state.cabinet}
                        onChange={(e) => this.cabinetUpdated(e)} />
                        <hr></hr>
                    <button class="btn btn-primary"
                        onClick={this.addChemical}
                        disabled={this.state.selectedChemical !== -1}>Add</button>
                    <button class="btn btn-primary"
                        disabled={this.state.selectedChemical === -1}
                        onClick={this.deleteSelected}>Remove</button>
                    <button class="btn btn-primary"
                        disabled={this.state.selectedChemical === -1}
                        onClick={this.editSelected}>Edit</button>
                </div>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default Chemicals;