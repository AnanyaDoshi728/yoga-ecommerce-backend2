const express = require('express')
const router = express.Router()

const {addOrder,getOrders,getOrderByEmail} = require('../controllers/Order')

router.post('/add-order',addOrder)
router.get('/get-orders',getOrders)
router.get('/get-order/:email',getOrderByEmail)

module.exports = router