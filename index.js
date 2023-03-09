const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')


const productRoutes = require('./routes/Product')
const orderRoutes = require('./routes/Order')
const userRoutes = require('./routes/User')

const app = express();

app.use(cors())

app.use(morgan('dev'));
app.use(bodyParser.json());

//routes 
app.use('/api/admin',productRoutes)
app.use('/api/admin',orderRoutes)
app.use('/api/admin',userRoutes) 

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE,{ useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(result => {
    app.listen(port); 
  })
  .catch(err => console.log(err));
