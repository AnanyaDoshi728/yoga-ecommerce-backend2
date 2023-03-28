const express = require('express')
const router = express.Router()

const {addVenue,getVenues,updateDate,getVenueByName} = require('../controllers/Venues')

router.post('/add-venue',addVenue)
router.get('/get-venues',getVenues)
router.get('/get-venue-by-name',getVenueByName)
router.patch('/update-dates/:id',updateDate)

module.exports = router