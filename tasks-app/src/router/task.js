const express = require('express')
const Task = require('../modules/task')
const router = new express.Router()

//======================================================================================================================
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            throw new Error()
        }
        await res.send(task)
    } catch (e) {
        res.status(404).send('There is no task with that id')
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send('There is no task with that id')
        }
        const updates = Object.keys(req.body)
        const allovedUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => allovedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send('invalid update operation')
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send('There is no task with that id')
        }
        res.redirect('/tasks')
    }catch (e) {
        res.status(500).send(e)
    }
})
//======================================================================================================================

module.exports = router