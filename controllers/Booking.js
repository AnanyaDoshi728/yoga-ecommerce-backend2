const Booking = require('../models/Booking')

const addBooking = async (req,res) => {
    try{
        const booking = await Booking.create(req.body)
        res.status(201).send({booking})
    }catch(error){
        res.status(500).json({message: error})
    }
}

const getBookings = async (req,res) => {
    try{
        const allBookings = await Booking.find()
        res.status(201).json({allBookings})
    }catch(error){
        res.status(500).json({message: error})
    }
}

module.exports = {
    addBooking,
    getBookings
}