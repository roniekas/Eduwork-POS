// const upload = multer({ dest: 'uploads' });
const router = require('express').Router();
const multer = require('multer');
const tagsController = require('./controller');
const os = require('os');
const { police_check } = require('../../middlewares');

router.delete('/tags/:id', police_check('delete', 'Tag'), tagsController.deleted);
router.get('/tags', tagsController.index);
router.put('/tags/:id', multer({ dest: os.tmpdir() }).single('image'), police_check('update', 'Tag'), tagsController.update);
router.post('/tags', multer({ dest: os.tmpdir() }).single('image'), police_check('create', 'Tag'), tagsController.store);

module.exports = router;