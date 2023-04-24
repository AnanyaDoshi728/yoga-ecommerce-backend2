const express = require('express')
const router = express.Router()

const {addOrder,getOrders,getOrderByEmail,updateOrderPaymentMade} = require('../controllers/Order')

router.post('/add-order',addOrder)
router.get('/get-orders',getOrders)
router.get('/get-order/:email',getOrderByEmail)
router.patch('/update-order-payment/:id',updateOrderPaymentMade)

module.exports = router