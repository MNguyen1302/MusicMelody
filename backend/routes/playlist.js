const express = require('express');

const router = express.Router();

const controller = require('../controllers/playlist.controller');

const upload = require('../middlewares/multer.middleware');

router.post('/:userId', controller.createPlaylist);

router.get('/:userId', controller.getPlaylist);

router.post('/detail/:id', controller.getPlaylistDetail);

router.patch('/add/:id', controller.addToPlaylist);

router.patch('/remove/:id', controller.removeFromPlaylist);

router.patch('/update/:id/:userId', upload, controller.updatePlaylist);

module.exports = router;