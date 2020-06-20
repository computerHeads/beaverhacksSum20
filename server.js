const express = require('express');
const exphbs = require('express-handlebars');
const connectDb = require('./config/dB');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000; // set port
app.use(express.static('client'));
app.use(cookieParser());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json({ extended: false }));

connectDb(); //  connect database

app.get('/', (req, res) => res.render('home')); // default route to app
app.get('/login', (req, res) => res.render('login'));

//define routes
app.use('/business', require('./routes/account'));
app.use('/business', require('./routes/login'));
app.use('/business', require('./routes/auth'));
app.use('/business', require('./routes/logout'));
app.use('/addCustomer', require('./routes/addCustomer'));
app.use('/business', require('./routes/mngCust'));
app.use('/addCustomer', require('./routes/addCustomer'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
