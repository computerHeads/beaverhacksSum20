const nodemailer = require('nodemailer');
const secret = require('../../config/default');

function notify(name, email, business, date, time) {
  var msg = `Hello ${name}, this is a reminder of your reservation for entry to ${business} on ${date} @ ${time} please follow the link below to edit or cancel your reservation`;
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
    subject: `Reservation to ${business}`, // Subject line
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
