const {Owner, validate, validateUpdate} = require('../models/owner.model');
const { APIResponse } = require('../config/APIResponse.config');

const getAll = async (req, res) => {
    try {
        const owners = await Owner.find();
        return res.status(200).send(APIResponse.success(owners));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

const getById = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND')); 

        return res.status(200).send(APIResponse.success(owner));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(APIResponse.fail(error.details[0].message, 'VALIDATION ERROR')); 

        const owner = new Owner(req.body);

        const saved = await owner.save();

        return res.status(200).send(APIResponse.success(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};



const deleter = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND'));  

        const deleted = await Owner.findByIdAndUpdate(owner._id, {isDeleted: true}, {new: true});

        return res.status(200).send(SUCCESS_RESPONSE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};




module.exports = {
    getAll, getById, create, deleter
}