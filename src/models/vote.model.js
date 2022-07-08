const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { registerSchema } = require('swaggiffy');
Joi.objectId = require("joi-objectid")(Joi);

/**
 * Vote schema
 */
const voteSchema = mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
voteSchema.plugin(timestamps);

/**
 * Vote
 * 
 */
const Vote = mongoose.model('Vote', voteSchema);

/**
 * Candidate Id dto
 * 
 */
const voteDto = {
    candidateId: '',
    voterId: '',
}
/**
 * register swagger model
 */
registerSchema('Vote', voteDto);

/**
 * validate model
 * @param {} data 
 * @returns 
 */
const validate = (data) => {
    const schema = {
        candidateId: Joi.objectId().required(),
        voterId: Joi.objectId().required(),
    }

    return Joi.validate(data, schema);

}


module.exports = {
    Vote,
    validate
}