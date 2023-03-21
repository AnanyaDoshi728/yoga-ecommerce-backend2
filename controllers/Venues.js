const Venues = require('../models/Venues')

const addVenue = async (req,res) => {
    try{
        const venue = await Venues.create(req.body)
        res.status(201).send({venue})
    }catch(error){
        res.status(500).json({message: error})
    }
}

const getVenues = async (req,res) => {
    try{
        const allBookings = await Venues.find()
        res.status(201).json({allBookings})
    }catch(error){
        res.status(500).json({message: error})
    }
}

const updateDate = async (req,res) => {
    try{
    const {id:venueId} = req.params
    const updatedDates = await Venues.findOneAndUpdate({_id: venueId},{datesBooked: req.body.datesBooked},{new: true})
    if(!updatedDates){
        return res.status(404).json(`No task wit id ${venueId}`)
    }
    res.status(200).json({updatedDates})
    }
    catch(error){
        res.status(500).json({message: error})
    }
}

module.exports = {
    addVenue,
    getVenues,
    updateDate
}