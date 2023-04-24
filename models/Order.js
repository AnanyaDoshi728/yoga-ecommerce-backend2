const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    addr: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    orderedItems:{
        type: [
            { name: String,
              price: Number,
              quantity: Number,
              productImage: String
            }
        ],
        required: true
    },
    paymentMade: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Order',ordersSchema)