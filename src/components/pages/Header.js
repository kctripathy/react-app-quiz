import React, { useState } from "react";
import QuizLogo from "../../assets/images/quiz-logo-50.jpg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="row bg-info m-0 p-0 header">
      <div className="col-4 text-left">
        <Link to="/">
          <img src={QuizLogo} alt="Quiz" />
        </Link>
      </div>
      <div className="col-4 text-center"></div>
      <div className="col-4 pt-1 text-right">
        <a href="https://www.odiware.com/" target="_blank" rel="">
          <img
            src="https://www.odiware.com/wp-content/uploads/2020/04/color_logo_transparent-scaled.jpg"
            alt="Odiware"
            height="40px"
            className="d-none"
          />
        </a>
      </div>
    </div>
  );
}

export default React.memo(Header);
