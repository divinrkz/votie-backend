require('dotenv').config();

require('./db/db');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const { Swaggiffy } = require('swaggiffy')
const {UserRoute} = require('./routes/users.route');
const {AuthRoute} = require('./routes/auth.route');
const {CandidateRoute} = require('./routes/candidates.route');
const {VoteRoute} = require('./routes/vote.route');
const {AUTH_MIDDLEWARE} = require('./middlewares/auth.middleware')

const PORT = process.env.PORT;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());

/**
 *  User Router
 */
app.use('/api/users', UserRoute);

/**
 * Auth Router
 */
app.use('/api/auth',  AuthRoute);

/**
 * Candidates router
 */
app.use('/api/candidates', [AUTH_MIDDLEWARE], CandidateRoute);

/**
 * Votes router
 */
app.use('/api/votes',  [AUTH_MIDDLEWARE], VoteRoute);


/**
 * Setup swaggiffy
 */
new Swaggiffy().setupExpress(app).swaggiffy();


/**
 * Run server on PORT
 */
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));