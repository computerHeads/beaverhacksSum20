const express = require('express');
const connectDb = require('./config/dB');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000; // set port

app.use(cookieParser());
app.use(express.json({ extended: false }));
connectDb(); //  connect database

app.get('/', (req, res) => res.send('App is working!')); // test route for server

// define routes
app.use('/business', require('./routes/account'));
app.use('/business', require('./routes/login'));
app.use('/business', require('./routes/auth'));
app.use('/business', require('./routes/logout'));
app.use('/addCustomer', require('./routes/addCustomer'));
app.use('/manageCustomers', require('./routes/mngCust'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
