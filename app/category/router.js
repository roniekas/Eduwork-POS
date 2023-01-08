// const upload = multer({ dest: 'uploads' });
const router = require('express').Router();
const multer = require('multer');
const productController = require('./controller');
const os = require('os');

router.delete('/category/:id', productController.deleted);
router.get('/category', productController.index);
router.put('/category/:id', multer({ dest: os.tmpdir() }).single('image'), productController.update);
router.post('/category', multer({ dest: os.tmpdir() }).single('image'), productController.store);

module.exports = router;