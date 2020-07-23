const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../modules/user')

//======================================================================================================================

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, 'doingthecoursefor2ndtime')
        const user = await User.findOne({_id: decode._id, 'tokens.token': token})
        req.token = token
        req.user = user

        next()

    } catch (e) {
        res.status(401).send({error: 'Please log-in'})
    }
}

module.exports = auth