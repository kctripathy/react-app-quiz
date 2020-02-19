import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import NavRoutes from './NavRoutes';
import Footer from './Footer';


function Main() {
    return (
        <div>
            <Header />                        
            <NavBar /> 
            <NavRoutes />              
            <Footer />
        </div>
    );
}

export default Main;