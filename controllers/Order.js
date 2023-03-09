const Order = require('../models/Order')

const addOrder = async (req,res) => {
    try{
        const order = await Order.create(req.body)
        res.status(201).send({order})
    }catch(error){
        res.status(500).json({message: error})
    }
}

const getOrders = async (req,res) => {
    try{
        const allOrders = await Order.find()
        res.status(201).json({allOrders})
    }catch(error){
        res.status(500).json({message: error})
    }
}

const getOrderByEmail = async (req,res) => {
    try{
        const allOrders = await Order.find({email: req.params.email})
        res.status(201).json({allOrders})
    }catch(error){
        res.status(500).json({message: error})
    }
}

module.exports = {
    addOrder,
    getOrders,
    getOrderByEmail
}