import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import aws from 'aws-sdk';

dotenv.config();

new aws.Config({
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  access_key_id: process.env.AWS_ACCESS_KEY_ID
});
aws.config.update({region: 'us-east-1'});

const Send = (emailArgs) => {
    let sesTransport = new aws.SES(),
      mailOptions,
      transporter = nodemailer.createTransport({
        SES: sesTransport
      });

  if (emailArgs.to) {
    //sending email with an attachment
    if (emailArgs.attachment) {
      mailOptions = {
        from: emailArgs.from || 'support@accorian.com',
        subject: emailArgs.subject,
        html: emailArgs.html,
        to: emailArgs.to,
        // bcc: Any BCC address you want here in an array,
        attachments: [
          {
            filename: emailArgs.filename ,//|| `${moment().format('MMDDYYYY')}_data.csv`,
            content: emailArgs.attachment
          }
        ]
      };
    }
    else {
      //sending email without attachment
      mailOptions = {
        from: emailArgs.from || 'support@accorian.com',
        subject: emailArgs.subject,
        html: emailArgs.html,
        to: emailArgs.to,
        // bcc: Any BCC address you want here in an array
      };
    }
    
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log('error sending email', {err, info});
          reject({ status_code: 'air404', message: err});
        }
        else {
          resolve({ status_code: 'air200', message: 'Email sent succesfully'});
        }
      });
    });
  }
  else {
    throw 'please provide a "to" address';
  }
};

export default {
  Send 
};
