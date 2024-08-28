const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobileNo: { type: String, required: true },
        role: { type: String, required: true, enum: ['User', 'Admin', 'Guest'] },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        strict: false, 
    },
);
module.exports = mongoose.model('ApplicationUser', UserSchema);
