const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/modules/user')
const Task = require('../../src/modules/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'User One',
    email: 'user.one@testjest.com',
    password: 'dovla123',
    tokens: [{
        token: jwt.sign({_id: userOneId}, 'doingthecoursefor2ndtime')
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'User Two',
    email: 'user.two@testjest.com',
    password: 'dovla123',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, 'doingthecoursefor2ndtime')
    }]
}

const userThree = {
    name: 'User Three',
    email: 'user.three@testjest.com',
    password: 'dovla123'
}

const taskAOne = {
    _id: new mongoose.Types.ObjectId,
    description: 'task A from user one',
    completed: false,
    author: userOneId
}

const taskBOne = {
    _id: new mongoose.Types.ObjectId,
    description: 'task B from user one',
    completed: true,
    author: userOneId
}

const taskATwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'task a from user two',
    completed: true,
    author: userTwoId
}

const taskBTwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'B',
    completed: true,
    author: userTwoId
}

const taskCTwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'C',
    completed: false,
    author: userTwoId
}

const taskDTwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'D',
    completed: false,
    author: userTwoId
}

const setupDB = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskAOne).save()
    await new Task(taskBOne).save()
    await new Task(taskATwo).save()
    await new Task(taskBTwo).save()
    await new Task(taskCTwo).save()
    await new Task(taskDTwo).save()
    const updateTask = await Task.findByIdAndUpdate(taskBTwo._id, {description: 'B updated'})
    await updateTask.save()
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    userThree,
    taskAOne,
    taskBOne,
    taskATwo,
    taskBTwo,
    taskCTwo,
    setupDB
}