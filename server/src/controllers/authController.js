const UserSchema = require("../models/userSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const applicationLogin = async(req, res, next) => {
    try{

        let payload = req.body;
        let email = payload.email;
        let password = payload.password;

        let userResult = await UserSchema.findOne({
            email: email,
            u_deletedAt: null,
          });

        if (userResult && userResult._id) {
            let isVerified = await bcrypt.compareSync( password, userResult.password);
            if (isVerified) {
                delete userResult.password
                let payload = {
                    _id: userResult._id,
                    role: userResult.role || "",
                    user: userResult
                };
                let token = JWT.sign(payload, process.env.TOKEN_SECRET, {
                    expiresIn: '1d',
                });
                res.status(200).json({ status: true, data: userResult, token: token });
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



const me = async(req, res, next) => {
    try{
        let userId = req?.user?._id
        let checkuser = await UserSchema.findOne({ _id: userId, u_status: true })
        .select([ "_id", "email", "u_role_id", "u_email", "u_status", "u_image_url"])
        if(checkuser){
            res.status(200).json({ status: true, data: checkuser, message: "Successfully got" });
        }else{
            res.status(404).json({ status: false, data: {}, message: "Unable to get" });
        }
    }catch(error){
        console.log('=== error ', error)
        res.status(502).json({ status: false, data: {}, message: "Internal Server Error" });
    }
}



module.exports = {
    applicationLogin,
    me
}