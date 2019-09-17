const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/home',(req, res) => {
    res.send('Welcome!');
});

app.get('/api/secret', (req, res) => {
    res.send('The password is potato');
});

app.listen(3000);
console.log(`Server is up on port 3000`);