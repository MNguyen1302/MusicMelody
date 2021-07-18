const express = require('express');

const router = express.Router();

const controller = require('../controllers/admin.controller');

const upload = require('../middlewares/multer.middleware');

router.post('/post/song', upload, controller.postSong);

router.post('/post/artist', upload, controller.postArtist);

router.patch('/edit/:slug', upload, controller.editSong);

router.get('/store/song', controller.store);

router.delete('/delete/:id', controller.deleteSong);

module.exports = router;