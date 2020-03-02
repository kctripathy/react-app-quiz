import React from 'react';
import Layout from './Layout';

function Home() {
    return (
        <Layout title="">
            <div className="jumbotron">home </div>
            <div className="row">
                <div className="col-lg-4 col-sm-12 home-page-content">
                    <h4>Some title....</h4>
                    <p>
                        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                    </p>
                </div>

                <div className="col-lg-4 col-sm-12 home-page-content">
                    <h4>Some title....</h4>
                    <p>
                        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                    </p>
                </div>
                

                <div className="col-lg-4 col-sm-12 home-page-content">
                    <h4>Some title....</h4>
                    <p>
                        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                    </p>
                </div>
                
            </div>           
        </Layout>
    );
}

export default Home;