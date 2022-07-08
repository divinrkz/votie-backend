const {Vehicle, validate, validateUpdate} = require('../models/vehicle.model');
const { hashPassword } = require('../utils/common.util');
const { APIResponse } = require('../config/APIResponse.config');

/**
 * Get all vehicle owner
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAll = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        return res.status(200).send(APIResponse.success(vehicles));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};

/**
 * Get by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND')); 

        return res.status(200).send(APIResponse.success(vehicle));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};


const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(APIResponse.fail(error.details[0].message, 'VALIDATION ERROR')); 

        let existing;
        existing =  await Vehicle.findOne({chasisNumber: req.body.chasisNumber})
       if (existing)  return res.status(400).send(APIResponse.fail('Vehicle with Chasis already exists')); 

        const vehicle = new Vehicle(req.body);

        const saved = await vehicle.save();

        return res.status(200).send(APIResponse.success(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};



const deleter = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).send(APIResponse.fail(null, 'NOT FOUND'));  

        const deleted = await Vehicle.findByIdAndUpdate(vehicle._id, {isDeleted: true}, {new: true});

        return res.status(200).send(SUCCESS_RESPONSE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(APIResponse.fail(err.toString()));
    } 
};




module.exports = {
    getAll, getById, create, deleter
}