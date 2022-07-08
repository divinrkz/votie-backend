const bcrypt = require('bcryptjs');

/**
 * get enum from object
 * @param {*} obj 
 * @returns 
 */
const getEnum = (obj) => {
    return Object.keys(obj)
            .map((key) => {
                return obj[key];
            })
}

/**
 * Hash password using bscypr
 * @param {*} password 
 * @returns 
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}



module.exports = {
    getEnum,
    hashPassword
}
