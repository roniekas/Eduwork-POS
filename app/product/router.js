// const upload = multer({ dest: 'uploads' });
const router = require('express').Router();
const multer = require('multer');
const productController = require('./controller');
const os = require('os');
const {police_check} = require('../../middlewares')

router.delete('/products/:id', police_check('delete', 'produk'), productController.deleted);
router.get('/products', productController.index);
router.put('/products/:id', multer({ dest: os.tmpdir() }).single('image'), police_check('update', 'produk'), productController.update);
router.post('/products', multer({ dest: os.tmpdir() }).single('image'), police_check('create', 'produk'), productController.store);

module.exports = router;