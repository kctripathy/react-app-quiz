import { AccountActionTypes } from '../constants/actionTypes';


let initialState = {
    accounts: [],
    loading: true,
    error: '',
    success: ''
};


const accountReducer = (state = initialState, action) => {

    switch (action.type) {

        case AccountActionTypes.fetchAccountSuccess:
            return {
                ...state,
                accounts: action.payload,
                loading: false
            }
        case AccountActionTypes.fetchAccounFailure:
            return {
                ...state,
                accounts: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default accountReducer;