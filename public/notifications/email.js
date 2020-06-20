const nodemailer = require('nodemailer');
const secret = require('../../config/default');

function notify(name, email, business, message) {
  var msg = message;
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: secret.email, // throwaway email used for sending
      pass: secret.emailPW, // password
    },
    tls: {
      rejectUnauthorized: false, // allows to use from outside gmail server
    },
  });
  // create the data object that will be sent with the transporter
  let data = {
    to: email, // where the email is being sent to
    subject: `Reservation to ${business} for ${name}`, // Subject line
    text: msg, // plain text body
    html: null, // html body
  };
  // send mail and log the error or the response in the client email form
  transporter.sendMail(data, (error, response) => {
    // if (error){
    // }else{
    //   // add some type of client side notification?
    // }
    transporter.close(); // close out the connection
  });
}

module.exports.notify = notify;
