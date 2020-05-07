import EMAILJS_USER_ID from '../../config';
import emailjs from 'emailjs-com';

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
        return emailjs.send('gmail', templateId, templateParams, 'user_Gy471SZKGgbwVNvzqjYeq')
            .then(res => res)
            .catch(err => err)
    }
    catch (e) {
        alert(e);
    }
};

export default sendEmail;