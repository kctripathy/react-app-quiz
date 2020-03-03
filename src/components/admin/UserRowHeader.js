import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


function UserRowHeader() {


    return (
        <Fragment>
            <li className="id row-header">ID</li>
            <li className="col-4 fullname row-header">Name</li>
            <li className="col-4 email row-header">Email</li>
            <li className="col-4 phone row-header">Phone</li>
            <li className="col-4 class row-header">Class</li>
            <li className="col-4 role row-header">Role</li>
            <li className="col-4 edit row-header">Edit?</li>
            <li className="col-4 delete row-header">Delete?</li>
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

export default UserRowHeader;