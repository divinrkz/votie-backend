/**
 * Owners router
 */

const router = require('express').Router();
const { registerDefinition } = require('swaggiffy');
const controllers = require('../controllers/candidate.controller');

router.get('/',  controllers.getAll);

router.get('/:id',  controllers.getById);

router.post('/' , controllers.create);

router.delete('/:id', controllers.deleter);

registerDefinition(router, {tags: 'Candidates', mappedSchema: 'Candidate', basePath: '/api/candidates'});

exports.CandidateRoute = router;