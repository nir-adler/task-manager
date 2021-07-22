const express = require('express')
const { Task } = require('../models/task')
const router = new express.Router()
const { auth } = require('../middleware/auth')
const { User } = require('../models/user')


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.send(task)
    } catch (e) {
        if (e.name === 'ValidationError') {
            res.status(400).send(e.errors)
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate value ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g, '')}` })
        } else {
            res.status(500).send(e)
        }
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        await req.user.populate({
            path: 'tasks',
            match: { _id }
        }).execPopulate()

        if (!req.user.tasks) {
            return res.status(400).send({ error: 'Task id not found!' })
        }
        res.send(req.user.tasks)
    } catch (e) {
        // console.log(e)
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else {
            res.status(500).send(e)
        }

    }

})

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['completed', 'description']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.params.id

    if (!isValid) {
        res.status(400).send({ error: 'Not valid update option/s!' })
    }
    try {
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            res.status(400).send({ error: 'Task id not found!' })
        }
        updates.forEach((update) => task[update] = req.body[update])
        console.log(req.body)
        await task.save()
        res.send(task)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else if (e.name === 'ValidationError') {
            res.status(400).send(e.errors)
        } else if (e.code === 11000) {
            res.status(400).send({ error: `Duplicate value ${JSON.stringify(e.keyValue).replace(/(\x5c|"|{|})/g, '')}` })
        } else {
            res.status(500).send(e)
        }
    }
})


router.delete('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id,owner:req.user._id})
        if (!task) {
            return res.status(500).send({ error: 'Task id not found!' })
        }
        await task.remove()
        res.send(task)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(400).send({ error: 'Not valid id!' })
        } else {
            res.status(500).send(e)
        }
    }
})


module.exports = {
    router
}