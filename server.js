const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('App is working!')); // test route for server

// define routes
app.use('/addCustomer', require('./routes/addCustomer'));
app.use('/manageCustomers', require('./routes/mngCust'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
