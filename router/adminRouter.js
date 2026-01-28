const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')
const adminSession = require('../middleware/adminSession')
const adminLogin = require('../middleware/isAdminLogin')

router.get('/login',adminLogin,adminController.getAdminLogin)
router.get('/dashboard',adminSession,adminController.getAdminDashboard)
router.get('/logout',adminController.adminLogout)
router.post('/login',adminController.postLogin) 
router.post('/block/:id',adminController.postBlock)
router.post('/unblock/:id',adminController.postunblock)
router.post('/delete/:id',adminController.postDelete)
router.post('/edit',adminController.postEdit)

module.exports = router

