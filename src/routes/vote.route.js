/**
 * Vehicle Owner routes
 */
const router = require('express').Router();
const { registerDefinition } = require('swaggiffy');
const controllers = require('../controllers/vote.controller');

router.get('/',  controllers.getAll);

router.get('/:id',  controllers.getById);

router.get('/voter/:voterId',  controllers.getByVoterId);

router.get('/candidate/:candidateId',  controllers.getByCandidateId);

router.post('/' , controllers.create);

router.delete('/:id', controllers.deleter);

registerDefinition(router, {tags: 'Votes', mappedSchema: 'Vote', basePath: '/api/votes'});

exports.VoteRoute = router;