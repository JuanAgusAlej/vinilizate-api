const express = require('express')
const router = express.Router()
const productsRouter = require('./products')
const usersRouter = require('./users')
router.use('/products', productsRouter)


router.use('/users', usersRouter)

module.exports = router