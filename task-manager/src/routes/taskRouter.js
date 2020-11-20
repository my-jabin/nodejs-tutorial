const express = require("express")
var { ObjectID } = require("mongodb");
const Task = require('../model/Task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body)
        let result = await task.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        let tasks = await Task.find()
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {

    try {
        let id = req.params.id
        if (!ObjectID.isValid(id)) {
            return res.status(404).send("User id is not valid!");
        }
        let task = await Task.findById(id)
        if (task) {
            res.send(task)
        } else {
            res.status(404).send("Task with ID " + id + " was not found!")
        }
    } catch (error) {
        res.status(500).send(error)
    }

})


router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperations = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperations) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        let id = req.params.id
        if (!ObjectID.isValid(id)) {
            return res.status(404).send("User id is not valid!");
        }

        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true, // return the modified object
        //     upsert: true, // if does not exist, create a new one
        //     runValidators: true // runs update validators on this command
        // })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (error) {
        // only focus the error occurs when validation is failed
        res.status(400).send(error)
    }
})


router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router