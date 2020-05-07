import React, { useState, Fragment } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import NavRoutes from "./NavRoutes";
import Footer from "./Footer";

function Main() {
  const [run, setRun] = useState(false);

  const changeHeader = () => {
    console.log("header chaged...");

    setRun(!run);
  };
  return (
    <Fragment>
      <Header onHeaderChage={changeHeader} />
      <NavBar />
      <NavRoutes />
      <Footer />
    </Fragment>
  );
}

export default Main;
