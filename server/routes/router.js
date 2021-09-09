const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 * @description root route
 * @method GET /
 */
route.get('/',services.homeRoutes)
/**
 * @description addrecord
 * @method GET /add-record
 */
route.get('/add-record',services.add_record)
/**
 * @description updaterecord
 * @method GET /update-record
 */
route.get('/update-record',services.update_record)

// API
route.post('/api/records',controller.create);
route.get('/api/records',controller.find);
route.put('/api/records/:id',controller.update);
route.delete('/api/records/:id',controller.delete);

module.exports = route;