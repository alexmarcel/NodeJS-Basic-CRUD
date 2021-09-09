
//require
const bodyparser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./server/database/connection');

//set env
dotenv.config({path:'config.env'});
const DOMAIN = process.env.DOMAIN || 'http://localhost';
const PORT = process.env.PORT || 8080;

//set app
const app = express();

//set morgan log request
app.use(morgan('tiny'));

//mongoDB connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname, "view/ejs"));

//load asset
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, ()=>{console.log(`Server is running on ${DOMAIN}:${PORT}`)});