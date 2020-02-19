import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';


const isActive = (history, path) => {

    if (history.location.pathname === path) {
        return ("nav-link active")
    }
    else {
        return ("nav-link inactive")
    }
}

function NavBar({history}) {
    return (        
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <Link className="navbar-brand" to="/">&nbsp;</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto col-9">
                        <li className="nav-item">
                            <Link to="/"><span className="sr-only">(current)</span></Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className={isActive(history, "/home")} to="/home">Home</Link>
                        </li> 
                        <li className="nav-item">
                            <Link className={isActive(history, "/about")} to="/about">About</Link>
                        </li> 
                        <li className="nav-item">
                            <Link className={isActive(history, "/quiz")} to="/quiz">Quiz</Link>
                        </li>                         
                    </ul>                   

                    <ul className="navbar-nav mr-auto col-3">                         
                            <Fragment>
                                <li className="nav-item">
                                    <Link className={isActive(history, "/login")} to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={isActive(history, "/register")} to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={isActive(history, "/contact")} to="/contact">Contact</Link>
                                </li>   
                            </Fragment>                                            
                            <Fragment>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link nav-link-topmenu dropdown-toggle" to="/"
                                        id="navbarDropdown" role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        My Profile
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/">Update Profile</Link>                                                                                 
                                    </div>
                                </li>                                
                            </Fragment>                        
                            
                    </ul>
                </div>
        </nav>


        // <div className="navbar">                           
        //     <Link to="/home">Home</Link> :: 
        //     <Link to="/about">About</Link> ::
        //     <Link to="/quiz">Quiz</Link> ::
        //     <Link to="/login">Login</Link> ::
        //     <Link to="/register">Register</Link> ::           
            
        // </div>
    );
}





export default withRouter(NavBar);