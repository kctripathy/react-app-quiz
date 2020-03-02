import {
    ActionTypes
} from '../constants/actionTypes';

let initialState = {
	users:[],
	loading: true,
	error: '',
	success: ''
};

const userReducer = (state = initialState, action) => {
    debugger;
	switch (action.type) {
        case ActionTypes.UserView:
            return {
                ...state, 
                user: action.payload, 
                loading: false
            }        
        default:
            return state;
    }
};

export default userReducer;