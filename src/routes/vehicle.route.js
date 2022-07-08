/**
 * Vehicle routes
 */

const router = require('express').Router();
const { registerDefinition } = require('swaggiffy');
const controllers = require('../controllers/vehicle.controller');

router.get('/',  controllers.getAll);

router.get('/:id',  controllers.getById);

router.post('/' , controllers.create);

router.delete('/:id', controllers.deleter);

registerDefinition(router, {tags: 'Vehicles', mappedSchema: 'Vehicle', basePath: '/api/vehicles'});

exports.VehicleRoute = router;