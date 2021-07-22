const express = require('express');

const router = express.Router();

const controller = require('../controllers/admin.controller');

const upload = require('../middlewares/multer.middleware');

router.post('/create/song', upload, controller.createSong);

router.post('/create/artist', upload, controller.createArtist);

router.patch('/edit/:slug', upload, controller.editSong);

router.get('/store/song', controller.store);

router.delete('/delete/:id', controller.deleteSong);

module.exports = router;