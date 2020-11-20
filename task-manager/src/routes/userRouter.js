const express = require("express")
var { ObjectID } = require("mongodb");
const User = require('../model/User')
const router = new express.Router()

router.post('/users/login', (req, res) => {

    User.findByCredentials(req.body.email, req.body.password)
        .then((user) => {
            if (user) {
                res.send("login successfully")
            } else {
                res.send("Unable to login")
            }
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        let result = await user.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send("error :" + error)
    }

})

router.get('/users', async (req, res) => {

    try {
        let users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/users/:id', async (req, res) => {

    try {
        let userId = req.params.id
        if (!ObjectID.isValid(userId)) {
            return res.status(404).send("User id is not valid!");
        }
        let user = await User.findById(userId)
        if (!user) {
            res.status(404).send("User with ID " + userId + " was not found!")
        } else {
            res.send(user)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// patch for updating a user
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperations = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperations) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true, // return the modified object
        //     upsert: true, // if does not exist, create a new one
        //     runValidators: true // runs update validators on this command
        // })

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (error) {
        // only focus the error occurs when validation is failed
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router