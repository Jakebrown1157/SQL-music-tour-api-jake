const stage = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

//show route
stage.get('/',async (req,res) => {
    try {
        const foundStages = await Stage.findAll({
            order:[[ 'stage_name', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name || ''}%` }  //grabs any Stage with a specified name or blank
            }
        })
        res.status(200).json(foundStages)
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

//get a specfic stage
stage.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { Stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// create a new stage
stage.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Stage created successfully',
            data: newStage
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// update stage
stage.put('/:id', async (req, res) => {
    try {
        const updatedStage = await Stage.update(req.body, {
            where: { Stage_id: req.params.id }
        })
        res.status(200).json({
            message: `Stage ${req.params.id} updated successfully`
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// delete a stage
stage.delete('/:id', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: { Stage_id: req.params.id }
        })
        res.status(200).json({
            message: `Stage ${req.params.id} deleted successfully`
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

module.exports = stage