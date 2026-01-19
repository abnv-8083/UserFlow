const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const sessionAuth = require('../middleware/authSession')
const userLogin = require('../middleware/isUserLogin')

router.get('/',userLogin,userController.getUserLogin)
router.get('/register',userController.getUserRegister)
router.get('/home',sessionAuth,userController.getHomePage)
router.get('/logout',userController.userLogout)
router.post('/register',userController.postRegister)
router.post('/login',userController.postLogin)

module.exports = router

