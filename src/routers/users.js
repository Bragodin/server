import express from 'express'
import UserController from '../controllers/user_controller'

const user_controller = new UserController()
const router = new express.Router()

router.get('/', user_controller.getUsers)
router.post('/signup', user_controller.signupUser)
router.post('/login', user_controller.login);

module.exports = router;