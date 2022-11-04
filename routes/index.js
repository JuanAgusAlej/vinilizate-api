const express = require('express')
const router = express.Router()
const productsRouter = require('./products')
const usersRouter = require('./users')
const cartRouter=require('./cart')




router.use('/products', productsRouter)

router.use('/users', usersRouter)

router.use('/cart', cartRouter)



module.exports = router