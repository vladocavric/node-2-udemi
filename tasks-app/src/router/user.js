const express = require('express')
const User = require('../modules/user')
const router = new express.Router()
//======================================================================================================================
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            throw new Error()
        }
        await res.send(user)
    } catch (e) {
        res.status(404).send('There is no user with that id')
    }
})

router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allovedUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update) => allovedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('invalid update operation')
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!user) {
            return res.status(404).send('There is no user with that id')
        }
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send('There is no user with that id')
        }
        res.redirect('/users')
    } catch (e) {
        res.status(500).send(e)
    }
})
//======================================================================================================================
module.exports = router