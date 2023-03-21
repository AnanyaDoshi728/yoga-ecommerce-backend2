const express = require('express')
const router = express.Router()

const {addVenue,getVenues,updateDate} = require('../controllers/Venues')

router.post('/add-venue',addVenue)
router.get('/get-venues',getVenues)
router.patch('/update-dates/:id',updateDate)

module.exports = router