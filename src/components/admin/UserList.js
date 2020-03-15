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
				<ul id="user-list">
					<UserRowHeader />
					{usersData.users.map((u, i) => <UserRow key={u.id} user={u} />)}
				</ul>
				{/* <table id="user-list">
					<thead><tr><UserRowHeader /></tr></thead>
					{usersData.users.map((u, i) => <tr key={u.id} ><UserRow user={u} /></tr>)}
				</table> */}
			</div>
		) : (
				<div>No records/users found</div>
			)
	}

	return (
		<Layout title="List of users" showCount={usersData && usersData.users.length}>
			{loadAllUsers()}
			{/* {JSON.stringify(usersData)} */}
		</Layout>
	)
}; //function UserList ==============================================================

const mapStateToProps = state => {
	return {
		usersData: state.user
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsers: () => dispatch(fetchUsers())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);