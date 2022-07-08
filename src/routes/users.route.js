
/**
 * Users router
 */
const router = require('express').Router();
const { registerDefinition } = require('swaggiffy');
const controllers = require('../controllers/user.controller');
const { AUTH_MIDDLEWARE } = require('../middlewares/auth.middleware');


router.get('/',  [AUTH_MIDDLEWARE], controllers.getAll);

router.get('/:id', [AUTH_MIDDLEWARE], controllers.getById);

router.post('/' , controllers.create);

router.delete('/:id', [AUTH_MIDDLEWARE], controllers.deleter);

registerDefinition(router, {tags: 'Users', mappedSchema: 'User', basePath: '/api/users'});

exports.UserRoute = router;