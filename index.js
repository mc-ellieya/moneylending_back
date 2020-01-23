//Third-party Libraries
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Libraries
const user = require('./user');
const status = require('./status');
//const bank;

//Express configs
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());


app.get('/api', (req, res) => {
    res.send("Connection success!");
})

app.post('/api/signup', async (req, res) => {
    res.send(await user.signUp(req.body));
    //TODO: Probably will have to change this to JSON
})

app.post('/api/login', async (req, res) => {
    //TODO: Fill this in
    res.send(await user.login(req.body));
})

//TODO: Make this more secure by requiring OAuth
app.get('/api/status', async (req, res) => {
    res.send(await user.getVerifyStatus(req.body));
})

//TODO: Make this more secure by requiring OAuth
//TODO: Make this admin access only
app.post('/api/status/update', async (req, res) => {
    //The most unsecure way to have a "password", ever
    let password = "zsLhmvSaHgPG5!@V$k0@p25YsnaP6At0Fpk";

   /**
     * Assume req body object looks like this:
     * {
     *      password: password,
     *      userID: int
     * }
     */



})

app.post('/api/bank/add', (req, res) => {

})

app.get('/', async (req, res) => {
    res.send(await user.verify(req.body));
})

app.listen(port, () => console.log(`Listening on port ${port}`))