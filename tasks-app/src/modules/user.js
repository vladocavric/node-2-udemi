const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User

//======================================================================================================================