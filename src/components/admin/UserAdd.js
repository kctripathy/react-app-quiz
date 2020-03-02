import React from 'react'
import Layout from '../pages/Layout';
import Register, { } from '../user/Register'

function UserAdd() {
     
    return (
        <Layout title="Add new user">
            <Register isAdmin="yes" />
        </Layout>

    )
};

export default UserAdd;