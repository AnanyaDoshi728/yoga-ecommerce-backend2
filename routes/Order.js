const express = require('express')
const router = express.Router()

const {addOrder} = require('../controllers/Order')

router.post('/add-order',addOrder)

module.exports = router