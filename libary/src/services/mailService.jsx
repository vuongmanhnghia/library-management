import emailjs from '@emailjs/browser';
import { message } from 'antd';

const MailService = {
    send: (values) => {
        emailjs
            .send(
                'service_h53j3ji', // Service ID trong EmailJS
                'template_w1ic71w', // Template ID trong EmailJS
                values,
                'GX77PhhpWopOUzlxQ', // User ID trong EmailJS
            )
            .then(() => {
                message.success('Inquiry Submitted Successfully');
            })
            .catch(() => {
                message.error('Submission Failed');
            });
    }
};

export default MailService;