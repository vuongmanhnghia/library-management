import emailjs from '@emailjs/browser';
import { message } from 'antd';

const MailService = {
    send: (values) => {
        emailjs
            .send(
                'service_h53j3ji',
                'template_w1ic71w',
                values,
                'GX77PhhpWopOUzlxQ',
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