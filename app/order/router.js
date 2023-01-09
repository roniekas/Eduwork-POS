const router = require('express').Router();
const orderController = require('./controller');
const { police_check } = require('../../middlewares')

router.post('/orders', police_check('create', 'Order'), orderController.store);
router.get('/orders', police_check('view', 'Order'), orderController.store);

module.exports = router;