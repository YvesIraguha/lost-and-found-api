import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


 const emailNotification = async(doc) =>{
    const msg = {
        to:`${doc.user.email}`,
        from: process.env.SENDGRID_DOMAIN_EMAIL,
        subject: 'Notification of your lost document',
        html:`<em> Dear ${doc.user.username},
              <br> Hope this email finds you well.<br>
              This is to let you know that your document was found.<br>
              Stay awesome!</em>`   
    };
 try{
     await sgMail.send(msg)
 }catch(error){
     throw new Error('Email not sent')
 }
}

export default emailNotification;
