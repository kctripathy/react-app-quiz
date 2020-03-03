import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


function UserRow({ user }) {

    const deleteUser = (userId) => {
        alert("delete ", userId);
    }
    return (
        <Fragment>
            <li className="id">{user.id}</li>
            <li className="col-4 fullname">{user.fullname}</li>
            <li className="col-4 email">{user.userEmail}</li>
            <li className="col-4 phone">{user.userPhone}</li>
            <li className="col-4 class">{user.classId}</li>
            <li className="col-4 role">{user.accessLevel}</li>
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

        </Fragment >
    );
}

export default UserRow;