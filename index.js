//Packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const onboarding;
const login;
const postVerification;
const general;
const lender;
const borrower;


//mySQL configs
// const pool = mysql.createPool({
//     host: "",
//     user: '',
//     password: '',
//     database: 'main',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// })

//Express configs
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    test.test();
})

app.listen(port, () => console.log(`Listening on ${port}!`))