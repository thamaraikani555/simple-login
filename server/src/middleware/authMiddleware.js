const jwt = require('jsonwebtoken');
const UserSchema = require('../models/userSchema')
const config = require('../config/config');

const tokenAuthendication = async (req, res, next) => {

    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: false, message: 'Access Denied: Invalid or Missing Token Format!' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ status: false, message: 'Access Denied: No Token Provided!' });
    }

    try {

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            return res.status(403).json({ status: false, message: 'Token Expired!' });
        }

        let role = decoded.role;
        const user = await UserSchema.findOne({_id: decoded._id});
        if (!user) {
            return res.status(403).json({  status: false, message: 'Invalid Token!' });
        }
        req.user = user;
        next();

        // if(role && role == 'Admin'){
        //     const user = await UserSchema.findOne({_id: decoded._id});
        //     if (!user) {
        //         return res.status(403).json({  status: false, message: 'Invalid Token!' });
        //     }
        //     req.user = user;
        //     next();
        // }else{
        //     return res.status(403).json({  status: false, data: [], message: 'Admin Can only view the list' });
        // }
       
    } catch (err) {
        console.log('=== err ', err)
        res.status(401).json({ msg: 'Token is not valid' });
    }
};


module.exports = {
    tokenAuthendication
}