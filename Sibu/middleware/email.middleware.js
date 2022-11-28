const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
   console.log('we are at start of send email');
   // // 1) create transporter
   const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      // service: process.env.EMAIL_SERVICE,
      auth: {
         user: process.env.EMAIL_USERNAME,
         password: process.env.EMAIL_PASSWORD,
      },
   });

   // 2) define the email options
   const mailOptions = {
      from: 'Sibu Dhital <dhitalsibu3@gmail.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
   };

   // 3) send the mail
   await transporter.sendMail(mailOptions);

   console.log('we completed checking send email function');
   // if you don't want to use this transport object anymore, uncomment following line
   //smtpTransport.close(); // shut down the connection pool, no
};
module.exports = sendEmail;
