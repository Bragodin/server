import express from 'express'
import UserController from '../controllers/user_controller'
import UserService from '../services/user_sevice'

const user_controller = new UserController()
const router = new express.Router()

console.log('ROUTER - ' + user_controller)

router.get('/', (req, res) => {
    const message = 'Hello, users!'
    res.json({ message })
})

module.exports = router;