const UserSchema = require("../models/userSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

const applicationSignup = async(req, res, next) => {
    try{

        const { firstName, lastName, email, mobileNo, role, password } = req.body;

       let insertData = {
            firstName: firstName,
            lastName: lastName,
            email: email, 
            mobileNo: mobileNo, 
            role: role, 
            password: password
       }

       let salt = bcrypt.genSaltSync();
       let hash = bcrypt.hashSync(insertData.password, salt);
       insertData.password = hash;

       let userResponse = await UserSchema.create(insertData);
        if(userResponse){
            res.status(200).json({ status: true, data: userResponse, message: "Successfully Created"});
        }else{
            res.status(404).json({ status: false, data: {}, message: "Unable to create"});
        }


    }catch(error){
        console.log('==== error', error)
        res.status(502).json({ status: false, message: 'Internal Server error' });
    }
}

const getAllUsers = async (req, res) => {
    try {
  
        const { search, role } = req.query;
        const query = {};
        if (search) {
            query.$or = [
                { firstName: new RegExp(search, 'i') },
                { lastName: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') },
                { mobileNo: new RegExp(search, 'i') },
            ];
        }
        if (role) {
            query.role = role;
        }
        query["deletedAt"] = null;

        let result = await UserSchema.find(query)
        if (result && result.length) {
            res.status(200).json({ status: true, data: result, message: 'Success' });
        } else {
            res.status(404).json({ status: false, data: [], message: 'Not Found' });
        }

    } catch (error) {
        console.log('==== error', error)
        res.status(502).json({ status: false, message: 'Internal Server error' });
    }
};

const getSingleUserById = async(req, res, next) => {
    try{
        const { userId } = req.params;
        if(!mongoose.isValidObjectId(userId)) {
            res.status(400).json({ status: false, message: 'Not Valid User' });
        }
        const query = {_id: userId, deletedAt: null};
        let result = await UserSchema.findOne(query)
        if (result && result._id) {
            res.status(200).json({ status: true, data: result, message: 'Success' });
        } else {
            res.status(404).json({ status: false, data: {}, message: 'Not Found' });
        }
    }catch(error){
        console.log('==== error', error)
        res.status(502).json({ status: false, message: 'Internal Server error' });
    }
}
module.exports = {
    applicationSignup,
    getAllUsers,
    getSingleUserById
}