import UserService from '../services/user_sevice'
import AuthService from '../services/auth_service'
const user_service = new UserService()
const auth_service = new AuthService()

class UserController {

    constructor() {}

    async getUsers(req, res) {
        try {
            const result = await user_service.getUsers(req, res);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }

    async signupUser(req, res) {
        try {
            const result = await auth_service.SignUp(req.body.email, req.body.password, req.body.name);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }

    async login(req, res) {
        try {
            const result = await auth_service.Login(req.body.email, req.body.password);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }
}

module.exports = UserController;