const { Router } = require('express')
const authController = require('../controllers/authController')
const router = Router()

router.get('/login',authController.login_get)
router.post('/login',authController.login_post)
router.get('/signup',authController.signin_get)
router.post('/signup',authController.signin_post)

module.exports = router;