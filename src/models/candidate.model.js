const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Joi = require('joi');
const { registerSchema } = require('swaggiffy');
const { EGender } = require('./enums');
const { getEnum } = require('../utils/common.util');

/**
 * Candidate schema
 */
const candidateSchema = mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        unique: true,
        required: true
    },
    profilePicture: {
        type: String,
    },
    missionStatement: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: getEnum(EGender),
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
candidateSchema.plugin(timestamps);

/**
 * Candidate model
 */
const Candidate = mongoose.model('Candidate', candidateSchema);

const candidateDto = {
    names: '',
    nationalId: '',
    gender: '',
    missionStatement: ''
}
/**
 * register swagger model
 */
registerSchema('Candidate', candidateDto);

/**
 * validate create owner input
 * @param {*} data 
 * @returns 
 */
const validate = (data) => {
    const schema = {
        names: Joi.string().required(),
        nationalId: Joi.string().regex(/^\d{16}$/).required(),
        missionStatement: Joi.string().required(),
        gender: Joi.array().items(...getEnum(EGender)).required()
    }

    return Joi.validate(data, schema);
}


module.exports = {
    Candidate,
    validate
}