import React, {userEffect} from 'react';
import { connect } from 'react-redux';
//import { useSelector, useDispatch } from 'react-redux';
import Layout from '../pages/Layout';
import { fetchAccounts } from '../../constants/actionMethodsAccounts';


function AccountList({ accountsData, fetchAccounts }) {
	//const accounts = useSelector(state=>state.account.accounts)
    //const dispatch = useDispatch();

    userEffect(()=>{
    	fetchAccounts();
    },[]);

    return (
        <Layout title="List of Accounts">

        </Layout>

    )
};

const mapStateToProps = state => {
	return {
		accountsData: state.account
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAccounts: () => dispatch(fetchAccounts())
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(AccountList);