/**
 * Owners router
 */

const router = require('express').Router();
const { registerDefinition } = require('swaggiffy');
const controllers = require('../controllers/owner.controller');

router.get('/',  controllers.getAll);

router.get('/:id',  controllers.getById);

router.post('/' , controllers.create);

router.delete('/:id', controllers.deleter);

registerDefinition(router, {tags: 'Owners', mappedSchema: 'Owner', basePath: '/api/owners'});

exports.OwnerRoute = router;