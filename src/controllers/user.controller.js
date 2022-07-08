const {User, validate, validateUpdate} = require('../models/user.model');
const { hashPassword } = require('../utils/common.util');
const {EUserType} = require('../models/enums');
const { APIResponse } = require('../config/APIResponse.config');


/**
 * get all users
 * @param {} req 
 * @param {*} res 
 * @returns 
 */
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send(APIResponse.success(users));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

/**
 * get users by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND')); 

        return res.status(200).send(APIResponse.success(user));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

/**
 * create user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(APIResponse.fail(error.details[0].message, 'VALIDATION ERROR')); 

        let existing;
         existing =  await User.findOne({nationalId: req.body.nationalId})
        if (existing)  return res.status(400).send(APIResponse.fail('User with National ID already exists')); 

        existing =  await User.findOne({email: req.body.email})
        if (existing)  return res.status(400).send(APIResponse.fail('User with Email already exists')); 

        existing =  await User.findOne({phoneNumber: req.body.phoneNumber})
        if (existing)  return res.status(400).send(APIResponse.fail('User with Phone Number already exists')); 

        req.body.password = await hashPassword(req.body.password);

        console.log(req.body);
        const user = new User(req.body);

        const saved = await user.save();

        return res.status(200).send(APIResponse.success(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


/**
 * delete user
 * @param {} req 
 * @param {*} res 
 * @returns 
 */
const deleter = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND'));  

        const deleted = await User.findByIdAndUpdate(user._id, {isDeleted: true}, {new: true});

        return res.status(200).send(SUCCESS_RESPONSE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};




module.exports = {
    getAll, getById, create, deleter
}