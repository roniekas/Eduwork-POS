// const upload = multer({ dest: 'uploads' });
const router = require('express').Router();
const multer = require('multer');
const productController = require('./controller');
const os = require('os');

router.delete('/products/:id', productController.deleted);
router.get('/products', productController.index);
router.put('/products/:id', multer({ dest: os.tmpdir() }).single('image'), productController.update);
router.post('/products', multer({ dest: os.tmpdir() }).single('image'), productController.store);

module.exports = router;