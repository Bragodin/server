import mongoose from 'mongoose'

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
});

const User = mongoose.model("Users", userScheme);

module.exports = User;