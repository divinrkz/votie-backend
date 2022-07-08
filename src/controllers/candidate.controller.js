const {Candidate, validate} = require('../models/candidate.model');
const { APIResponse } = require('../config/APIResponse.config');

/**
 * Get all candidates
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAll = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        return res.status(200).send(APIResponse.success(candidates));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

/**
 * Get candidate by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getById = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND')); 

        return res.status(200).send(APIResponse.success(candidate));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


/**
 * Create candidates
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(APIResponse.fail(error.details[0].message, 'VALIDATION ERROR')); 

        let existing;
        existing =  await Candidate.findOne({nationalId: req.body.nationalId})
       if (existing)  return res.status(400).send(APIResponse.fail('Candidate with National ID already exists')); 

        const candidate = new Candidate(req.body);

        const saved = await candidate.save();

        return res.status(200).send(APIResponse.success(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


/**
 * Deleter candidate by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleter = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND'));  

        const deleted = await Candidate.findByIdAndUpdate(candidate._id, {isDeleted: true}, {new: true});

        return res.status(200).send(SUCCESS_RESPONSE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};




module.exports = {
    getAll, getById, create, deleter
}