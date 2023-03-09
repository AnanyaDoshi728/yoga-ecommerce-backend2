const Order = require('../models/Order')

const addOrder = async (req,res) => {
    try{
        const order = await Order.create(req.body)
        res.status(201).send({order})
    }catch(error){
        res.status(500).json({message: error})
    }
}

module.exports = {
    addOrder
}