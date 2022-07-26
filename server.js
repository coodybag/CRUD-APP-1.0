const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path'); //path is inbuilt in node app

const connectDB = require('./server/database/connection');

const app = express();

//setting your dotenv config file for your PORT
dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

// log requests into the terminal using morgan
app.use(morgan('tiny'));

//mongoDB connection call
connectDB();

//pass requests through body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set the view engine wrt to ejs
app.set("view engine","ejs")

//Load all assets
app.use('/css',express.static(path.resolve(__dirname, "assets/css")))
app.use('/js',express.static(path.resolve(__dirname, "assets/js")))
app.use('/img',express.static(path.resolve(__dirname, "assets/img")))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(3000, ()=>{ console.log(`Server is running on http://localhost:${PORT}`)})