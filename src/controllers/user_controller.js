import UserService from '../services/user_sevice'
const user_sevice = new UserService()

class UserController {
    constructor() {
        console.log('constructor works!')
    }

}

module.exports = UserController;