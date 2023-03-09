const User = require('../models/User')

const createUser = async (req,res) => {
    try{
        const user = await User.create(req.body)
        res.status(201).send({user})
    }catch(error){
        res.status(500).json({message: error})
    }
}

const getUserByEmail =  async (req,res) => {
    try{
        const user = await User.find({email: req.params.email})
        res.status(201).json({user})
    }catch(error){
        res.status(500).json({message: error})
    }
}

module.exports = {
    createUser,
    getUserByEmail
}