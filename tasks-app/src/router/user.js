const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const User = require('../modules/user')
const router = new express.Router()
//======================================================================================================================
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload Image'))
        }
        cb(undefined, true)
    }
})
//======================================================================================================================
router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) {
       res.status(400).send()
    }
})



router.get('/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)


    } catch (e) {
        res.status(404).send()
    }
})

// router.get('/me/avatar', )
//======================================================================================================================
// create a user
router.post('/', async (req, res) => {
    const checkUser = await User.findOne({email: req.body.email})
    if (checkUser) {
        return res.status(400).send('User with this email alredy exists')
    }
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})
//======================================================================================================================
// log-in
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})
//======================================================================================================================
// read authenticated users profile
router.get('/me', auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })


// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) {
//             throw new Error()
//         }
//         await res.send(user)
//     } catch (e) {
//         res.status(404).send('There is no user with that id')
//     }
// })
//======================================================================================================================

router.patch('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allovedUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update) => allovedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('invalid update operation')
    }

    try {
        const user = req.user
        // const user = await User.findById(req.user._id)
        // if (!user) {
        //     return res.status(404).send('There is no user with that id')
        // }
        updates.forEach((update) => user[update] = req.body[update])
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.patch('/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allovedUpdates = ['name', 'email', 'age', 'password']
//     const isValidOperation = updates.every((update) => allovedUpdates.includes(update))
//
//     if (!isValidOperation) {
//         return res.status(400).send('invalid update operation')
//     }
//
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) {
//             return res.status(404).send('There is no user with that id')
//         }
//         updates.forEach((update) => user[update] = req.body[update])
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//
//         await user.save()
//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })
//======================================================================================================================
router.delete('/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send('There is no user with that id')
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// router.delete('/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) {
//             return res.status(404).send('There is no user with that id')
//         }
//         res.redirect('/users')
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })


//======================================================================================================================
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})
//======================================================================================================================
router.post('/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})
//======================================================================================================================
module.exports = router