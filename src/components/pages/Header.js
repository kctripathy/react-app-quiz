import React, { useState } from 'react';
import QuizLogo from '../../assets/images/quiz-logo-50.jpg';
import { Link } from 'react-router-dom';

function Header(props) {

    return (
        <div className="row bg-info m-0 p-0 header">
            <div className="col-4 text-left">
                <Link to="/">
                    <img src={QuizLogo} />
                </Link>
            </div>
            <div className="col-4 text-center">

            </div>
            <div className="col-4 pt-1 text-right">
            </div>
        </div>
    );
}

export default React.memo(Header);