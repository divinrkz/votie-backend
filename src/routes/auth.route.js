const router = require('express').Router();
const { registerDefinition } = require('swaggiffy');
const controllers = require('../controllers/auth.controller');
const {AUTH_MIDDLEWARE} = require('../middlewares/auth.middleware')

router.post('/login',  controllers.login);

router.get('/get-current',  [AUTH_MIDDLEWARE], controllers.getCurrentUser);

registerDefinition(router, {tags: 'Auth', mappedSchema: 'AuthDto', basePath: '/api/auth'});

exports.AuthRoute = router;