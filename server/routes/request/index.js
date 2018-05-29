const router = require('express').Router();
const controller = require('./request.controller');
const authCheck = require('../../middleware/auth');

router.route('/request/:id').post(controller.creaetRequest);

router.route('/request').get(authCheck, controller.readRequest);

module.exports = router;
