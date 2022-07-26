const express = require('express');
const route = express.Router()

const services = require('../services/render');
//require the controller file for APIs
const controller = require('../controller/controller');

/**
 * @description Root/home page route
 * @method GET/
 */
route.get('/', services.homeRoutes);

/**
 * @description add-user route
 * @method GET/
 */
route.get('/add-user',services.add_user);

/**
 * @description update-user route
 * @method GET/
 */
route.get('/update-user',services.update_user);

//API
route.post('/api/crudapp', controller.create);
route.get('/api/crudapp', controller.find);
route.put('/api/crudapp/:id', controller.update);
route.delete('/api/crudapp/:id', controller.delete);

//makes it possible to use router file in server.js
module.exports = route