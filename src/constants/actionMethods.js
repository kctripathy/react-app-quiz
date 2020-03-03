import { ActionTypes } from '../constants/actionTypes';
import { loadAllUsers } from '../components/admin';

const fetchUserSuccess = (users) => {
    //debugger;
    return {
        type: ActionTypes.fetchUserSuccess,
        payload: users
    }
};

const fetchUserFailure = (error) => {
    return {
        type: ActionTypes.fetchUserFailure,
        payload: error
    }
};

const fetchUsers = () => {
    return (dispatch) => loadAllUsers()
        .then(data => {
            //debugger;
            if (data === undefined)
                dispatch(fetchUserFailure('Some error occured'));
            else if (data.status.code === "1")
                dispatch(fetchUserSuccess(data.result))
            else
                dispatch(fetchUserFailure(data.status.message))
        })
        .catch(err => {
            dispatch(fetchUserFailure(err))
        })

    // return (dispatch) => {
    //     axios.get('http://localhost:5050/api/users/all?accountId=1')
    //         .then(response => {
    //             debugger;
    //             const users = response.data.result;
    //             dispatch(fetchUserSuccess(users))
    //         })
    //         .catch(error => {
    //             debugger;
    //             const msg = error.message
    //             dispatch(fetchUserFailure(msg))
    //         })
    // }
};

export { fetchUsers }