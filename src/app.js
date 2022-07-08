require('dotenv').config();

require('./db/db');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const { Swaggiffy } = require('swaggiffy')
const {UserRoute} = require('./routes/users.route');
const {AuthRoute} = require('./routes/auth.route');
const {VehicleRoute} = require('./routes/vehicle.route');
const {OwnerRoute} = require('./routes/owner.route');
const {VehicleOwnerRoute} = require('./routes/vehicle-owner.route');
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
 * Vehicle router
 */
app.use('/api/vehicles', [AUTH_MIDDLEWARE], VehicleRoute);

/**
 * Onwners router
 */
app.use('/api/owners',  [AUTH_MIDDLEWARE], OwnerRoute);

/**
 * Vehicle Router
 */
app.use('/api/vehicle-owners', [AUTH_MIDDLEWARE], VehicleOwnerRoute);


/**
 * Setup swaggiffy
 */
new Swaggiffy().setupExpress(app).swaggiffy();


/**
 * Run server on PORT
 */
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));