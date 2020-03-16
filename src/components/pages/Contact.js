import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Layout from './Layout';

function Contact() {
    const [Name, setName]=useState('Kishor');
    const [Email,setEmail]=useState('kctripathy@gmail.com');
    const [Subject, setSubject]=useState('Subject of the mail');
    const [Message, setMessage]=useState('Some text for body of the message will go here');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit=(e)=>{
        //alert("e=",e);
        e.preventDefault();
        const templateId = 'quiz_contact_from';
        sendEmail(templateId, {
            mail_message: Message,
            mail_subject: Subject,
            mail_from: Name,
            mail_reply_to: Email
        });
    };

    const sendEmail = (templateId, templateParams) => {
        //debugger;
        //emailjs.send('gmail', templateId, templateParams,'user_Gy471SZKGgbwVNvzqjYeq')
        //    .then(res => {
        //        debugger;
        //        setSuccess('Email successfully sent!')
        //    })         
        //    .catch(err => {
        //        debugger;
        //        setError('Oh well, you failed. Here some thoughts on the error that occured:', err)
        //    })

        try {
            debugger;
            emailjs.send('gmail', templateId, templateParams, 'user_Gy471SZKGgbwVNvzqjYeq')
                .then(res => {
                    debugger;
                    setSuccess('Email successfully sent!')
                })
                .catch(err => {
                    debugger;
                    setError('Oh well, you failed. Here some thoughts on the error that occured:', err)
                })
        }
        catch (e) {
            alert(e);
        }
    };

    const sendPasswordResestLink = () => {
        const templateId = 'forgot_password_link';
        sendEmail(templateId, {
            message_html: Message,           
            to_name: Name,
            to_mail: Email
        });
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
                                <input 
					                type="text" 
					                className="form-control" 
					                id="user_name" 
                                        name="user_name" 
                                        value={Name}
					                onChange = {(e)=>setName(e.target.value)}
					                placeholder="Enter your name" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                </div>
                                <input type="email" 
                                        className="form-control"
                                        id="user_email"
                                        name="email" 
                                        value={Email}
					                    onChange = {(e)=>setEmail(e.target.value)}
                                        placeholder="Enter your email" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                </div>
                                <input 
					                type="text" 
					                className="form-control" 
					                id="mail_subject" 
                                        name="mail_subject" 
                                        value={Subject}
					                onChange = {(e)=>setSubject(e.target.value)}
					                placeholder="Enter mail subject" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-comment text-info"></i></div>
                                </div>
                                    <textarea className="form-control"
                                        id="mail_message"
                                        name="mail_message"
                                        placeholder="Please enter your message here" 
                                        value={Message}
					                    onChange = {(e)=>setMessage(e.target.value)}
                                        required>
                                 </textarea>
                            </div>
                        </div>

                        <div className="text-center">
                            <input type="submit" value="Submit" className="btn btn-info rounded-0 py-2" />
                        </div>
                    </div>
                                                    
                </div>
                </form>

                <div className="text-center">
                    <input type="submit" value="Send Password Reset Link" onClick={sendPasswordResestLink} className="btn btn-info rounded-0 py-2" />
                </div>
            </div>
        )
    };


    const address = () => {
        return (
            <div className="card bg-light mb-3">
                <div className="card-header bg-info text-white text-uppercase">
					<i className="fa fa-home"></i> Address
				</div>
                <div className="card-body">
                    <p>This is some address</p>
                    <p>BANGALORE</p>
                    <p>569001 Karnataka (India)</p>
                    <p>Email : email@example.com</p>
                    <p>Tel. +91 22331 11122</p>
                    <p>Fax. +91 22331 11122</p>
                </div>
            </div>
        )
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error.length > 0 ? '' : 'none' }}>
            <b>{error}</b>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success.length > 0 ? '' : 'none' }}>
            <b>{success}</b>
        </div>
    );

    return (        
        <Layout>
           <div className="row" style={{paddingBottom: "20px"}}>                 
                <div className="col-lg-6 col-sm-12">
                    {contactForm()}
                    {showSuccess()}
                    {showError()}
                </div>
                <div className="col-lg-6 co-sm-12 user-contact-image">
                    {address()}
                </div>
            </div>       
        </Layout>        
    );
}

export default Contact;