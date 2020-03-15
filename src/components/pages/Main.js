import React, { useState } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import NavRoutes from './NavRoutes';
import Footer from './Footer';


function Main() {
    const [run, setRun] = useState(false);

    const changeHeader = () => {
        console.log('header chaged...');

        setRun(!run);
    }
    return (
        <div>
            <Header onHeaderChage={changeHeader} />
            <NavBar />
            <NavRoutes />
            <Footer />
        </div>
    );
}

export default Main;