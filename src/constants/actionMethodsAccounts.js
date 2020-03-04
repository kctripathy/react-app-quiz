import { AccountActionTypes } from '../constants/actionTypes';
import { loadAllAccounts } from '../components/admin';

const fetchAccountSuccess = (accounts) => {
    return {
        type: AccountActionTypes.fetchAccountSuccess,
        payload: accounts
    }
};
const fetchAccountFailure = (error) => {
    return {
        type: AccountActionTypes.fetchAccountFailure,
        payload: error
    }
};

const addAccountSuccess = (account) => {
    return {
        type: AccountActionTypes.addAccountSuccess,
        payload: account
    }
};
const addAccountFailure = (error) => {
    return {
        type: AccountActionTypes.addAccountFailure,
        payload: error
    }
};


const fetchAccounts = () => {
    return (dispatch) => loadAllAccounts()
        .then(data => {
            //debugger;
            if (data === undefined)
                dispatch(fetchAccountFailure('Some error occured'));
            else if (data.status.code === "1")
                dispatch(fetchAccountSuccess(data.result))
            else
                dispatch(fetchAccountFailure(data.status.message))
        })
        .catch(err => {
            dispatch(fetchAccountFailure(err))
        })
};

// const addNewAccount = (Account) => {
//     return (dispatch) => register(Account)
//         .then(data => {
//             //debugger;
//             if (data === undefined)
//                 dispatch(addAccountFailure('Some error occured'));
//             else if (data.status.code === "1")
//                 dispatch(addAccountSuccess(data.result))
//             else
//                 dispatch(addAccountFailure(data.status.message))
//         })
//         .catch(err => {
//             dispatch(addAccountFailure(err))
//         })
// };


export { fetchAccounts }