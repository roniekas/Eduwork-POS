const router = require('express').Router();
const multer = require('multer');
const productController = require('./controller');
const os = require('os');
const { police_check } = require('../../middlewares');

router.delete('/category/:id', police_check('delete', 'Category'), productController.deleted);
router.get('/category', productController.index);
router.put('/category/:id', multer({ dest: os.tmpdir() }).single('image'), police_check('update', 'Category'), productController.update);
router.post('/category', multer({ dest: os.tmpdir() }).single('image'), police_check('create', 'Category'), productController.store);

module.exports = router;