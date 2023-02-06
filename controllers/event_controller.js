const event = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

//show route
event.get('/',async (req,res) => {
    try {
        const foundEvents = await Event.findAll({
            order:[[ 'date', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name || ''}%` }  //grabs any Event with a specified name or blank
            }
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

//get a specfic event
event.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { Event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// create a new event
event.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Event created successfully',
            data: newEvent
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// wpdate Event
event.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: { Event_id: req.params.id }
        })
        res.status(200).json({
            message: `Event ${req.params.id} updated successfully`
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// delete an event
event.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: { Event_id: req.params.id }
        })
        res.status(200).json({
            message: `Event ${req.params.id} deleted successfully`
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

module.exports = event