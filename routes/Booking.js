const express = require('express')
const router = express.Router()

const {addBooking,getBookings} = require('../controllers/Booking')

router.post('/add-booking',addBooking)
router.get('/get-bookings',getBookings)

module.exports = router