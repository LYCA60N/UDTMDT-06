// models/User.js (Backend)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: { type: String, required: true },
    role: {
        type: String,
        default: 'customer', // Tự động gán vai trò là "customer" khi đăng ký
    },
    addresses: { type: Array, default: [] }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;