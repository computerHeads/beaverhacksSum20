const express = require('express');
const exphbs = require('express-handlebars');
const connectDb = require('./config/dB');

const app = express();
const PORT = process.env.PORT || 3000; // set port
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json({ extended: false }));

connectDb(); //  connect database

app.get('/', (req, res) => res.render('home')); // default route to app

// define routes
app.use('/manageCustomers', require('./routes/mngCust'));
app.use('/addCustomer', require('./routes/addCustomer'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
