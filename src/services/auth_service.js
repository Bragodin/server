import * as argon2 from 'argon2';
import User from '../models/user_model'
import * as jwt from 'jsonwebtoken'

class AuthService {

    generateToken(user) {
        console.log('user for login')
        console.log(user)
        const data = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        const signature = 'MySuP3R_z3kr3t'
        const expiration = '6h'
        return jwt.sign({ data, }, signature, { expiresIn: expiration })
    }

    async SignUp(email, password, name) {
        try {
            const passwordHashed = await argon2.hash(password);
            const user = new User({
                password: passwordHashed,
                email: email,
                name: name,
            });
            await user.save();
            return {
                user: {
                    email: user.email,
                    name: user.name,
                },
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async Login(email, password) {
        const userRecord = await User.findOne({ email })
        if (!userRecord) {
            throw new Error('User not found')
        } else {
            const correctPassword = await argon2.verify(userRecord.password, password)
            if (!correctPassword) {
                throw new Error('Incorrect password')
            }

            return {
                user: {
                    email: userRecord.email,
                    name: userRecord.name,
                },
                token: this.generateToken(userRecord),

            }

        }

    }

}

module.exports = AuthService;