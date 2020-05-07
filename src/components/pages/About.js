import React from "react";
import Layout from "./Layout";

function About() {
  return (
    <Layout title="About">
      <p>
        This application has been developed by the IT Team of Odiware
        Technologies, which is a Leader in Software development as well as
        Testing services .
      </p>
      <p>
        It is basically for those students, who want to test their knowledge.
        Some colleges organize such technical quiz events. In such cases, an
        application will be used and will be found to be very user-friendly and
        requires less manpower as everything is online.
      </p>
      <p>
        It can be also useful for the aspirants, who prepares for
        Medical/Engineering/Banking or any competetive examination.
      </p>
      <div className="heading">
        <b>The Objectives for developing the application is: </b>
      </div>
      <ul className="ul-list" style={{ listStyleType: "none" }}>
        <li className="mb-2">
          <i className="fa fa-caret-right" aria-hidden="true"></i> To conduct
          efficient, transparent and international standards tests in order to
          assess the competency of candidates for admission, and recruitment
          purposes.{" "}
        </li>
        <li className="mb-2">
          <i className="fa fa-caret-right" aria-hidden="true"></i> To undertake
          research on educational, professional and testing systems to identify
          gaps in the knowledge systems and take steps for bridging them.{" "}
        </li>
        <li className="mb-2">
          <i className="fa fa-caret-right" aria-hidden="true"></i> To identify
          experts and institutions in setting examination questions.{" "}
        </li>
        <li className="mb-2">
          <i className="fa fa-caret-right" aria-hidden="true"></i> To produce
          and disseminate information and research on education and professional
          development standards.
        </li>
      </ul>
    </Layout>
  );
}

export default About;
