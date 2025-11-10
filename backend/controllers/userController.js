const User = require('../models/User.js');

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: password,
        });
        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email không tồn tại' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Mật khẩu không chính xác' });
        }
        const { password: userPassword, ...userData } = user.toObject();
        res.status(200).json({
            message: 'Đăng nhập thành công!',
            user: userData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName: firstName,
                lastName: lastName,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Không tìm thấy user' });
        }

        const { password, ...userData } = updatedUser.toObject();

        res.status(200).json({
            message: 'Cập nhật thành công!',
            user: userData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser
};