const mongoose = require('mongoose')

const bookingsSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required: true
    },
    participants: {
        type: String,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    night: {
        type: Number,
        required: true
    },
    packageNumber:{
        type: Number,
        required: true
    },
    individualRoomCost:{
        type: Number,
        required: true
    },
    sharedRoomCost: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
   startDate: {
    type: String,
    required: true 
   }
})

module.exports = mongoose.model('Booking',bookingsSchema)