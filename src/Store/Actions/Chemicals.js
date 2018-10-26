import * as actionTypes from './actionTypes'

export const addChemical = ( chemical ) => {
    return {
        type: actionTypes.ADD_CHEMICAL,
        chemical: chemical
    };
};

export const removeChemical = ( index ) => {
    return {
        type: actionTypes.REMOVE_CHEMICAL,
        index: index
    };
};

export const editChemical = (chemical, index ) => {
    return {
        type: actionTypes.EDIT_CHEMICAL,
        chemical: chemical,
        index: index
    };
};

export const selectChemical = ( index ) => {
    return {
        type: actionTypes.SELECT_CHEMICAL,
        index: index
    };
};

export const updateChemicalName = ( value ) => {
    return {
        type: actionTypes.UPDATE_CHEMICAL_NAME,
        value: value
    };
};

export const updateChemicalTradeName = ( value ) => {
    return {
        type: actionTypes.UPDATE_CHEMICAL_TRADE_NAME,
        value: value
    };
};

export const updateChemicalQuantity = ( value ) => {
    return {
        type: actionTypes.UPDATE_CHEMICAL_QUANTITY,
        value: value
    };
};

export const updateChemicalUoM = ( value ) => {
    return {
        type: actionTypes.UPDATE_CHEMICAL_UOM,
        value: value
    };
};

export const updateChemicalCabinet = ( value ) => {
    return {
        type: actionTypes.UPDATE_CABINET_NAME,
        value: value
    };
};