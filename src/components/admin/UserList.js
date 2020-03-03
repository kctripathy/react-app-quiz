import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Layout from '../pages/Layout';
import { fetchUsers } from '../../constants/actionMethods';
import './User.css';
import UserRow from './UserRow';
import UserRowHeader from './UserRowHeader';

function UserList({ usersData, fetchUsers }) {

	useEffect(() => {
		fetchUsers();
	}, []);

	const loadAllUsers = () => {
		return usersData && usersData.users.length > 0 ? (
			<div className="row">
				<ul id="ulUserList">
					<UserRowHeader />
					{usersData.users.map((u, i) => <UserRow key={u.id} user={u} />)}
				</ul>

			</div>
		) : (
				<div>No records found</div>
			)
	}
	console.log('usersData', usersData);

	return (
		<Layout title="List of users" showCount={usersData && usersData.users.length}>

			{loadAllUsers()}

			{/* {JSON.stringify(usersData)} */}
		</Layout>
	)
};

const mapStateToProps = state => {
	return {
		usersData: state.user
	}
};

// const mapDispatchToProps = dispatch => ({
// 	loadUsers: () => dispatch({ type: ActionTypes.UserLoad })	
// });

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsers: () => dispatch(fetchUsers())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);