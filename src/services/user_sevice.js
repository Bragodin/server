import mongoose from 'mongoose'
import User from '../models/user_model'

class UserService {
    constructor() {}
    async getUsers(req, res) {
        try {
            return await User.find();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = UserService;