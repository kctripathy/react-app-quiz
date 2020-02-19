import React from 'react';

function Layout(props) {
    return (
        <div className="container layout mt-2">
            <h2>{props.title? props.title : ''}</h2>
            {props.children}
        </div>
    );
}

export default Layout;