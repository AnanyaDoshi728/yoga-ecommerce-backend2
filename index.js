const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')


const productRoutes = require('./routes/Product')
const orderRoutes = require('./routes/Order')
const bookingRoutes = require('./routes/Booking')
const venueRoutes = require('./routes/Venues')

const app = express();

app.use(cors())

app.use(morgan('dev'));
app.use(bodyParser.json());

//routes 

// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
//   next();
// });


app.use('/api/admin',productRoutes)
app.use('/api/admin',orderRoutes)
app.use('/api/admin',bookingRoutes)
app.use('/api/admin',venueRoutes)


const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE,{ useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(result => {
    app.listen(port); 
  })
  .catch(err => console.log(err));
