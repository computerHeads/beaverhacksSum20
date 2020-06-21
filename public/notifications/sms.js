const secret = require('../../config/default.js');
const client = require('twilio')(secret.accountSid, secret.authToken);

function send(phone, message) {
  client.messages.create({
    body: message,
    from: '+12029463457',
    to: phone,
  });
  // .then((message) => console.log(message.sid));
}

module.exports.send = send;
