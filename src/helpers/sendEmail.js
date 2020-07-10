import dotenv from 'dotenv';

dotenv.config();


export default (
  user, email, name, phone
) => {
  const msg = {
    to: user,
    from: process.env.SENDGRID_DOMAIN_NAME,
    subject: 'Lost and Found Notification',
    text: 'Notification for your lost document',
    html: `<em> Dear ${user},
                      <br> Hope this email finds you well.<br>
                      This is to let you know that your document was found by ${name} whose email is ${email} and phone is ${phone}.<br>
                      Stay awesome!</em>`
  };
  return msg;
};
