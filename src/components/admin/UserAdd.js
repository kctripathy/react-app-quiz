import React from 'react'
import Layout from '../pages/Layout';
import Register, { } from '../user/Register'

function UserAdd() {
    const userAddForm = () => {
        return (
            <div>
                <Register isAdmin="yes" />
            </div>
        )
    }
    return (
        <Layout>
            {userAddForm()}
        </Layout>

    )
};

export default UserAdd;