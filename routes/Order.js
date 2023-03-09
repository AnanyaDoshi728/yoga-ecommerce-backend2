const express = require('express')
const router = express.Router()

const {addOrder,getOrders} = require('../controllers/Order')

router.post('/add-order',addOrder)
router.get('/get-orders',getOrders)

module.exports = router