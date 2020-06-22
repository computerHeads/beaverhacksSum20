# uQueue - Digital queuing application for small businesses

- A submission to <a href="https://beaverhacks-summer-2020.devpost.com/">BeaverHacks Summer 2020</a> hackathon

- **Authors**: <a href="https://github.com/jung8">Andrew Jung</a> / <a href="https://github.com/JamesWeiMoseley">James Moseley</a> / <a href="https://github.com/positive235">Hae-Ji Park</a>

## Inspiration

The current COVID-19 situation has created the need for social distancing. This has changed the way we as a society go about our everyday lives, one example in particular is the routine act of visiting your local businesses. In order to maintain safe distances occupancy limits are being enforced, and lines to enter businesses are becoming common. We built this app in hopes of addressing this issue

## What it does

It gives small business the capability to allow their customers to form lines remotely to practice safe social distancing. Businesses just need to make an account and provide their customers with a "add customer portal" so they can join the line from the safety of their computer or mobile devices. Business have a portal where they can manage their customers, see the order of the line, and add and delete customers.

## Built With

JavaScript / express.js / jquery / node.js / mongoDB / mongoose / html5 / css / bootstrap / cndjs / twilio

## How to Run 

1. Create `default.js` in `config` folder. 

** It includes **private infos** - related to database, etc, so it is not uploaded.
**Keep `default.js` private** and please make sure **not to upload or share with public**. **

2. In `config/default.js`,

```
module.exports = {
    mongoURI: 'your_mongoDB_URI_provided_by_mongoDB',
    jwtSecret: 'you_can_enter_anything',
    email: 'your_google_email_address_for_sending_notification',
    emailPW: 'your_google_email_password',
    accountSid: 'your_Account_SID_provided_by_Twilio',
    authToken: 'your_Auth_Token_provided_by_Twilio',
}
```

3. In Terminal, (Make sure you're at `beaverhacksSum20` folder)

```
npm i
npm start
```

4. On your web browser, go to `http://localhost:your_port_number/` and enjoy!

