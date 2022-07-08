const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { APIResponse } = require('../config/APIResponse.config');

const SECRET_KEY = process.env.JWT_SECRET;

/**
 * Authentication Middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const AUTH_MIDDLEWARE = async(req, res, next) => {
  
        const header = req.header('Authorization');
        if (!header) 
            return res.status(401).send(APIResponse.fail(null, 'NO BEARER TOKEN FOUND')); 
        
         if (!(header.startsWith('Bearer ')))  
            return res.status(401).send(APIResponse.fail(null, 'INVALID BEARER TOKEN')); 
            
        const token = header.split(' ')[1];  
        console.log(token);  

        try {
         const decoded = jwt.verify(token, SECRET_KEY);
         
         const user = await User.findById(decoded._id);

         req.AUTH_USER = {_id: user._id, user};

         next();

        }
        catch (err) {
            console.error(err);
            return res.status(500).send(APIResponse.fail(err.toString()));
        }
} 

module.exports = {AUTH_MIDDLEWARE}