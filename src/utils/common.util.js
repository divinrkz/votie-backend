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


/**
 * Generate Plate Number
 * @returns plateNumber
 */
 const generatePlateNumber = () =>  {
    let result           = 'RAD';
    const numbers       = '0123456789';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for ( var i = 0; i < 3; i++ ) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
   }
   for ( var i = 0; i < 1; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
 }
   return result;
}

console.log(generatePlateNumber());
module.exports = {
    getEnum,
    hashPassword, generatePlateNumber
}
