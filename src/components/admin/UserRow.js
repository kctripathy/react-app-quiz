import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


function UserRow({ user }) {

    const deleteUser = (userId) => {
        alert("delete ", userId);
    }
    return (

        <Fragment>
            {/* <ul style={{ color: user.allowLogin ? '' : 'red' }}> */}
            <li className="id">{user.id}</li>
            <li className="col-4 fullname">{user.fullname}&nbsp;</li>
            <li className="col-4 email">{user.userEmail}&nbsp;</li>
            <li className="col-4 phone">{user.userPhone}&nbsp;</li>
            <li className="col-4 class">{user.className}&nbsp;</li>
            <li className="col-4 role">{
                user.accessLevel && user.accessLevel === 1 ? ('Super Admin') :
                    (
                        user.accessLevel === 10 ? ("Admin") : ('User')
                    )
            }&nbsp;
            </li>
            <li className="col-4 allow-login" style={{ color: user.allowLogin ? 'green' : 'red' }}
            >{user.allowLogin ? 'Yes' : 'No'}&nbsp;
            </li>
            <li className="col-4 last-login">{new Date(user.lastLoginDate).toLocaleString()}&nbsp;</li>
            {/* <li className="col-4 last-login">{user.lastLoginDate}&nbsp;</li> */}
            <li className="col-4 edit"><Link to={`/user/edit/${user.id}`}>Edit</Link></li>
            <li className="col-4 edit"><Link to={`/user/delete/${user.id}`}>Delete</Link></li>
            {/* <li className="col-4 edit">
                <button className="btn btn-danger btn-sm"
                    onClick={() => {
                        if (window.confirm('Delete the user?' + user.id)) (deleteUser(user.id))
                    }
                    }>
                    Delete
                </button>
            </li> */}
            {/* </ul> */}
        </Fragment >
    );
}

export default UserRow;