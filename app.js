const express = require("express");
const mysql = require("mysql2");
const path = require("path")
const dotenv = require("dotenv");

dotenv.config({ path: "./.env"});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))

// Parse URL-encoded bodies (as per HTML forms)
app.use(express.urlencoded({ extended: false}));
// Parse JSON bodies (as sent    by API clients)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error){
        console.log(error)
    }else {
        console.log("mysql connected!!")
    }
})

//Deined routes
app.use('/', require('./routes/pages'))

app.use("/auth", require("./routes/auth"))


app.listen(5000, () => {
    console.log("Server started on port no 5000!!!")
})