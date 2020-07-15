const mongoose = require('mongoose')
const validator = require('validator')

//======================================================================================================================
const url = 'mongodb://127.0.0.1:27017/task-app-api'

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
//======================================================================================================================

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('This is not en email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            const str = value.toLowerCase()
            if (str.includes('password') || str.includes('123456') || str.includes('qwerty')) {
                throw new Error('the password mast be more complex')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('the age cant be negative')
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

const user1 = new User({
    name: 'Mix',
    email: 'somet@ETON.com',
    password: 'qwerty1232'
    // age: 38
})

// user1.save().then((user) => {
//     console.log(user)
// }).catch((e) => {
//     console.log(e)
// })

//======================================================================================================================

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema)

const task1 = new Task({
    description: 'nesto',
    // completed: true
})

task1.save().then((task) => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})

//mongoose validatores built in

// npm validator