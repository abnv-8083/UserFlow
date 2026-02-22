const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')
const adminSession = require('../middleware/adminSession')
const adminLogin = require('../middleware/isAdminLogin')
const date = require('../middleware/datePrint')


router.get('/login',date,adminLogin,adminController.getAdminLogin)
router.get('/dashboard',date,adminSession,adminController.getAdminDashboard)
router.get('/logout',date,adminController.adminLogout)
router.post('/login',date,adminController.postLogin) 
router.post('/block/:id',date,adminController.postBlock)
router.post('/unblock/:id',date,adminController.postunblock)
router.post('/delete/:id',date,adminController.postDelete)
router.post('/edit',date,adminController.postEdit)

module.exports = router

