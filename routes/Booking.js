const express = require('express')
const router = express.Router()

const {addBooking,getBookings,updateBookingPaymentMade} = require('../controllers/Booking')

router.post('/add-booking',addBooking)
router.get('/get-bookings',getBookings)
router.patch('/update-booking-payment/:id',updateBookingPaymentMade)

module.exports = router