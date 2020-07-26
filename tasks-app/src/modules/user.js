const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Task = require('./task')

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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// virtual
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    // delete userObject.avatar

    return userObject
}

//generate user tocken
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'doingthecoursefor2ndtime')
    user.tokens = user.tokens.concat({token})
    user.save()
    return  token
}

//login
userSchema.statics.findByCredentials= async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('wrong credentials')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('wrong credentials')
    }

    return user
}

//hash the password
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// delete user tasks
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({author: user._id})
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User

//======================================================================================================================