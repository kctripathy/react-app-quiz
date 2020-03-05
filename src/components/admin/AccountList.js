import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//import { useSelector, useDispatch } from 'react-redux';
import Layout from '../pages/Layout';
import { fetchAccounts } from '../../constants/actionMethodsAccounts';


function AccountList({ accountsData, fetchAllAccounts }) {
	//const accounts = useSelector(state=>state.account.accounts)
	//const dispatch = useDispatch();

	useEffect(() => {
		fetchAllAccounts();
	}, []);

	return (
		<Layout title="List of Accounts">
			<div>
				<pre>
					{JSON.stringify(accountsData, null, 4)}
				</pre>
			</div>
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
		fetchAllAccounts: () => dispatch(fetchAccounts())
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(AccountList);