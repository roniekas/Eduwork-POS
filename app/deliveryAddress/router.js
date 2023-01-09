// const upload = multer({ dest: 'uploads' });
const router = require('express').Router();
const multer = require('multer');
const deliveryAddressController = require('./controller');
const os = require('os');
const { police_check } = require('../../middlewares');

router.get('/delivery', police_check('view', 'DeliveryAddress'), deliveryAddressController.index);
router.delete('/delivery/:id', deliveryAddressController.deleted);
router.put('/delivery/:id', deliveryAddressController.update);
router.post('/delivery', police_check('create', 'DeliveryAddress'), deliveryAddressController.store);

module.exports = router;