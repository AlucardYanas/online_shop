const express = require('express');
const morgan = require('morgan');
const productsRouter = require('./router/productsRouter');

const app = express();

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/products', productsRouter); 

module.exports = app;