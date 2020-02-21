import React from 'react';
import Layout from './Layout';

function Contact() {


    const handleFormSubmit=(e)=>{
        alert("e=",e);
    };

    const contactForm = () => {
        return (
            <div>
            <form onSubmit={handleFormSubmit}>            
                <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                        <div className="bg-info text-white text-center py-2">
                            <h3><i className="fa fa-envelope"></i> Contact</h3>
                        </div>
                    </div>
                    <div className="card-body p-3">
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                </div>
                                <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Enter your name" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                </div>
                                <input type="email" className="form-control" id="nombre" name="email" placeholder="Enter your email" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-comment text-info"></i></div>
                                </div>
                                <textarea className="form-control" placeholder="Message" required></textarea>
                            </div>
                        </div>

                        <div className="text-center">
                            <input type="submit" value="Submit" className="btn btn-info rounded-0 py-2" />
                        </div>
                    </div>
                                                    
                </div>
            </form>
            </div>
        )
    };


    const address = () => {
        return (
            <div className="card bg-light mb-3">
                <div className="card-header bg-info text-white text-uppercase"><i class="fa fa-home"></i> Address</div>
                <div className="card-body">
                    <p>Address 1</p>
                    <p>BANGALORE</p>
                    <p>569001 India</p>
                    <p>Email : email@example.com</p>
                    <p>Tel. +91 22331 11122</p>
                    <p>Fax. +91 22331 11122</p>
                </div>
            </div>
        )
    };

    
    return (        
        <Layout>
           <div className="row" style={{paddingBottom: "20px"}}>                 
                <div className="col-lg-6 col-sm-12">
                    {contactForm()}
                </div>
                <div className="col-lg-6 co-sm-12 user-contact-image">
                    {address()}
                </div>
            </div>       
        </Layout>        
    );
}

export default Contact;