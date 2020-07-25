const express = require('express')
const Task = require('../modules/task')
const auth = require('../middleware/auth')
const router = new express.Router()

//======================================================================================================================
// get   /tasks?completed=true
// get   /tasks?limit=10&skip=10
// get   /tasks?sortBy=completed_dis
router.get('/', auth, async (req, res) => {
    // const match = {author: req.user.id}
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === "true"
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('-')
        sort[parts[0]] = parts[1] === 'disc' ? -1 : 1
    }
    try {
        // const tasks = await Task.find(match)
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
        // res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            author: req.user._id
        })
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id, author: req.user.id})
        if (!task) {
            throw new Error()
        }
        await res.send(task)
    } catch (e) {
        res.status(404).send('There is no YOUR task with that id')
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id, author: req.user.id})
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

router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, author: req.user.id})
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