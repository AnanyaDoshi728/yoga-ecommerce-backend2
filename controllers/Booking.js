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

const updateBookingPaymentMade = async (req, res) => {
    const id = req.params.id;
    try {
      const booking = await Booking.findByIdAndUpdate(id, { paymentMade: true });
      res.status(200).json(booking);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating paymentMade property." });
    }
  };

module.exports = {
    addBooking,
    getBookings,
    updateBookingPaymentMade
}