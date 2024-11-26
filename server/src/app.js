const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productsRouter = require('./router/productsRouter');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/products', productsRouter); 

module.exports = app;