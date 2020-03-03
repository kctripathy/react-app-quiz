import { ActionTypes } from '../constants/actionTypes';


let initialState = {
    users: [],
    loading: true,
    error: '',
    success: ''
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case ActionTypes.fetchUserSuccess:

            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case ActionTypes.fetchUserFailure:
            return {
                ...state,
                users: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;