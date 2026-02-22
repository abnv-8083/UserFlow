const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const sessionAuth = require('../middleware/authSession')
const userLogin = require('../middleware/isUserLogin')
const date = require('../middleware/datePrint')

router.get('/',date,userLogin,userController.getUserLogin)
router.route('/register')
.get(userController.getUserRegister)
.post(userController.postRegister)
router.get('/home',date,sessionAuth,userController.getHomePage)
router.get('/logout',date,userController.userLogout)
router.post('/login',date,userController.postLogin)
router.get('/review',date,userController.getviews)

module.exports = router

