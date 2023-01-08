// const upload = multer({ dest: 'uploads' });
const router = require('express').Router();
const multer = require('multer');
const tagsController = require('./controller');
const os = require('os');

router.delete('/tags/:id', tagsController.deleted);
router.get('/tags', tagsController.index);
router.put('/tags/:id', multer({ dest: os.tmpdir() }).single('image'), tagsController.update);
router.post('/tags', multer({ dest: os.tmpdir() }).single('image'), tagsController.store);

module.exports = router;