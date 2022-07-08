/**
 * Vehicle Owner routes
 */
const router = require('express').Router();
const { registerDefinition } = require('swaggiffy');
const controllers = require('../controllers/vehicle-owner.controller');

router.get('/',  controllers.getAll);

router.get('/:id',  controllers.getById);

router.get('/owner/:ownerId',  controllers.getByOwnerId);

router.get('/vehicle/:vehicleId',  controllers.getByVehicleId);

router.post('/' , controllers.create);

router.delete('/:id', controllers.deleter);

registerDefinition(router, {tags: 'VehicleOwners', mappedSchema: 'VehicleOwner', basePath: '/api/vehicle-owners'});

exports.VehicleOwnerRoute = router;