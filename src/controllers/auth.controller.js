const {User, validateLogin} = require('../models/user.model');
const { APIResponse } = require('../config/APIResponse.config');
const bcrypt = require('bcryptjs');


/**
 * Login method
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async (req, res) => {
    try {
        const {error} = validateLogin(req.body)
        ;
        if (error) return res.status(400).send(APIResponse.fail(error.details[0].message, 'VALIDATION ERROR')); 

        const user = await User.findOne({email: req.body.email, isDeleted: false});
        if (!user) return res.status(400).send(APIResponse.fail(null, 'Invalid Credentials')); 

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send(APIResponse.fail(null, 'Invalid Credentials')); 

        const AUTH_USER = {
            _id: user._id,
            token: user.generateAuthToken()
        };

        return res.status(200).send(APIResponse.success(AUTH_USER));
    } catch (err) {
        console.error(err);
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

/**
 * Get authenticated users 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.AUTH_USER._id);
        return res.status(200).send(APIResponse.success(user));

    } catch (err)  {
        console.error(err);
        return res.status(500).send(APIResponse.fail(err.toString()));
    }
};

module.exports = {
    login, getCurrentUser
};