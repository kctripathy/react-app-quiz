import React from "react";
import Layout from "./Layout";

function Home() {
  return (
    <Layout title="">
      <div className="jumbotron-background">
        <div className="jumbotron">
          <h2 className="display-4">Online Mock Examination!</h2>
          <p className="lead">
            Practice thousands of online practice test questions and review
            answers
          </p>
          <hr className="my-4" style={{ width: "40%" }} />
          <p>
            Join our regular Topic tests based on the latest exam pattern and
            check your preparation
          </p>
          <p className="lead text-center">
            <a className="btn btn-primary btn-xs" href="/about" role="button">
              Learn more
            </a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-sm-12 text-center">
          <h4 className="home-section-title">Why?</h4>
          <p>
            <b>Why should I use this?</b>
          </p>
          <p>
            It might be the first question, that strikes any mind to register
            with this website. Well, the answer is to sharpen your skill to
            achive your goal.
          </p>
          <p>
            In most exams, multiple choice questions plays big role to fetch
            good marks. That is why you need more and more practice. And this is
            a play ground for you to practice and secure good mark in exam or
            pass any test that
          </p>
        </div>

        <div className="col-lg-4 col-sm-12 text-center">
          <h4>How?</h4>
          <p>
            <b>How can I achive my goal?</b>
          </p>
          <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print
          </p>
          <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.
          </p>
        </div>

        <div className="col-lg-4 col-sm-12 text-center">
          <h4>When?</h4>
          <p>
            <b>When can I practice?</b>
          </p>
          <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
