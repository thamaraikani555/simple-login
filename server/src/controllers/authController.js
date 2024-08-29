const UserSchema = require("../models/userSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const applicationLogin = async(req, res, next) => {
    try{

        let { email, password } = req.body;

        let userResult = await UserSchema.findOne({
            email: email,
            u_deletedAt: null,
          });

        if (userResult && userResult._id) {
            let isVerified = await bcrypt.compareSync( password, userResult.password);
            if (isVerified) {

                userResult = userResult.toObject();
                delete userResult.password
                let payload = {
                    _id: userResult._id,
                    role: userResult.role || "",
                    mobileNo: userResult.mobileNo || 0
                };
                let token = JWT.sign(payload, process.env.TOKEN_SECRET, {
                    expiresIn: '1d',
                });
                res.status(200).json({ status: true, data: userResult, token: token, message: "Successfully Logged In"  });
            } else {
                res.status(404).json({ status: false, data: {}, message: "Incorrect Password" });
            }
        } else {
            res.status(404).json({ status: false, data: {}, message: "Invalid User" });
        }

    }catch(error){
        console.log('==== error', error)
        res.status(500).json({ status: false, msg: 'Internal Server error' });
    }
}

module.exports = {
    applicationLogin,
}