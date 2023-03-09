const express = require('express')

const router = express.Router()

const {createUser, getUserByEmail} = require('../controllers/User')

router.post('/create-user',createUser)
router.get('/user/:email',getUserByEmail)

module.exports = router