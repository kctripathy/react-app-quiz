import React, { useState, Fragment } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import NavRoutes from "./NavRoutes";
import Footer from "./Footer";

function Main() {
  return (
    <Fragment>
      <Header />
      <NavBar />
      <NavRoutes />
      <Footer />
    </Fragment>
  );
}

export default Main;
