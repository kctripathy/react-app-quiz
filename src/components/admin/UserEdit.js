import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Register from '../user/Register'
import Layout from '../pages/Layout';

function UserEdit({ usersData, match }) {

    const showUser = () => {
        const user = usersData.users.filter(u => u.id === Number(match.params.userId));
        //debugger;
        return user && <Register isAdmin="yes" mode="edit" user={user} />
    }
    return (
        <Layout title="">
            {showUser()}
            {/* {JSON.stringify(user)} */}
        </Layout>
    )
};


const mapStateToProps = state => {
    return {
        usersData: state.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        //fetchUsers: () => dispatch(fetchUsers())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);