const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const venueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  datesBooked: {
    type: String,
    required: true
  },
 
});

module.exports = mongoose.model('Venue', venueSchema);