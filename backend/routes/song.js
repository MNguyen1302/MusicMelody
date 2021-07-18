const express = require('express');

const router = express.Router();

const controller = require('../controllers/song.controller');

router.get('/top/trending', controller.getTopSong);

router.get('/genre/:type', controller.getCategory);

router.get('/', controller.getAllSongs);

router.get('/:slug', controller.getSong);

router.get('/:slug/getLike', controller.getLikeSong);

router.patch('/:slug/like', controller.likeSong);

module.exports = router;