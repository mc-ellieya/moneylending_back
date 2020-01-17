//Packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const user = require('./user');
const status = require('./status');
//const bank;

//mySQL configs
const pool = mysql.createPool({
    host: "35.231.57.89",
    user: 'root',
    password: '1b%ab3a1s%GlOfz*BP$qZSEkbCutyuRYmKb',
    database: 'lend-main-db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

//Initialize all function holders
//Will replace later if we find better solution


//Express configs
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());

user.init(pool);
console.log(user.checkExists("username", "example1"));

app.get('/api', (req, res) => {
    res.send("Connection success!");
})

app.post('/api/signup', (req, res) => {
    res.send(user.signUp(req));
    //TODO: Probably will have to change this to JSON
})

app.post('/api/login', (req, res) => {
    //TODO: Fill this in
})

//TODO: Make this more secure by requiring OAuth
app.get('/api/status', (req, res) => {
    //TODO: user.getVerifyStatus should throw an error
    //TODO: implement some way to catch the message.
    let verified, message;

    try {
        verified = user.getVerifyStatus(req.id);
        message = "OK";
    } catch (error) {
        message = error;
    }

    res.json({
        "success": verified,
        "status": message
    })
})

app.post('/api/bank/add', (req, res) => {

})

app.get('/', (req, res) => {
    
})

app.listen(port, () => console.log(`Listening on port ${port}`))