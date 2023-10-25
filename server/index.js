require('./db/mongoose');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routeUser = require('./routes/user');
app.use('/api',routeUser);

app.listen(8080, () => {
    console.log('started');
});