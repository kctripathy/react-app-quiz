import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Register from '../user/Register'

function UserEdit({ usersData, match }) {

    //const [user, setUser] = useState({});

    useEffect(() => {
        //console.log("usersData.users", usersData.users);
        //const user = usersData.users.filter(u => u.id === Number(match.params.userId));
        //console.log("user", user);
        //setUser(user);
    }, [])
    //console.log(props);
    console.log(match.params.userId);

    const showUser = () => {
        const user = usersData.users.filter(u => u.id === Number(match.params.userId));
        debugger;
        return user && <Register isAdmin="yes" mode="edit" user={user} />
    }
    return (
        <div>
            {showUser()}

            {/* {JSON.stringify(user)} */}

        </div>
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