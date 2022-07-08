const {Vote, validate} = require('../models/vote.model');
const { APIResponse } = require('../config/APIResponse.config');
const { Candidate } = require('../models/candidate.model');
const { User } = require('../models/user.model');
const { EUserType } = require('../models/enums');

/**
 * get All votes
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAll = async (req, res) => {
    try {
        const votes = await Vote.find().populate('candidate voter');
        return res.status(200).send(APIResponse.success(votes));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

/**
 * Get voter candidate by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getById = async (req, res) => {
    try {
        const vote = await Vote.findById(req.params.id).populate('candidate voter');;
        if (!vote) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND')); 

        return res.status(200).send(APIResponse.success(vote));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

/**
 * Get all votes by a candidate
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const getByCandidateId = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.candidateId);
        if (!candidate) return res.status(404).send(APIResponse.fail('Owner doesnot already exists')); 

        const votes = await Vote.find({candidate: candidate._id}).populate('candidate voter');;

        return res.status(200).send(APIResponse.success(votes));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


/**
 * Get all vehicles by an candidate
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const getByVoterId = async (req, res) => {
    try {
        const voter = await User.findOne({_id: req.params.voterId, userType: EUserType.VOTER});
        if (!voter) return res.status(404).send(APIResponse.fail('Voter doesnot already exists')); 

        const votes = await Vote.find({voter: voter._id}).populate('candidate voter');;

        return res.status(200).send(APIResponse.success(votes));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

/**
 * Create voter candidate
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(APIResponse.fail(error.details[0].message, 'VALIDATION ERROR')); 

        const voter = await User.findOne({_id: req.body.voterId, userType: EUserType.VOTER});
        if (!voter) return res.status(404).send(APIResponse.fail(null, 'Voter not found'));

        const candidate = await Candidate.findById(req.body.candidateId);
        if (!candidate) return res.status(404).send(APIResponse.fail(null, 'Canidate not found'));

        
        const vote = new Vote({
            voter: voter._id, candidate: candidate._id
        });

        const saved = await vote.save();

        return res.status(200).send(APIResponse.success(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


/**
 * Vehicle candidate delter
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleter = async (req, res) => {
    try {
        const vote = await Vote.findById(req.params.id);
        if (!vote) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND'));  

        const deleted = await Vote.findByIdAndUpdate(vote._id, {isDeleted: true}, {new: true});

        return res.status(200).send(SUCCESS_RESPONSE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};




module.exports = {
    getAll, getById, create, deleter, getByCandidateId, getByVoterId
}