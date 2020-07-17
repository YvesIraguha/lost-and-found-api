import dotenv from 'dotenv';

dotenv.config();


export default (
  userEmail, userName, email, name, phone
) => {
  const msg = {
    to: userEmail,
    from: process.env.ADMIN_EMAIL,
    subject: 'Lost and Found Notification',
    text: 'Notification for your lost document',
    html: `<em> Dear ${userName},
                      <p> Hope this email finds you well.</p>
                      This is to let you know that your document was found by ${name}<br>
                       whose email is ${email}<br> and phone is ${phone}.<br>
                      <b>Stay awesome!</b></em>`
  };
  return msg;
};
