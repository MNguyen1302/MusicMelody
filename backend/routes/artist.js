const express = require('express');

const router = express.Router();

const controller = require('../controllers/artist.controller');

router.get('/', controller.getAllArtist);

router.get('/:id', controller.getArtist);

// router.get('/getSong', controller.getSongOf);

module.exports = router;