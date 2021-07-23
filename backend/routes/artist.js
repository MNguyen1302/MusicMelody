const express = require('express');

const router = express.Router();

const controller = require('../controllers/artist.controller');

router.get('/', controller.getAllArtist);

router.get('/:slug', controller.getArtist);

// router.get('/follower/:slug', controller.getFollower);

router.get('/:slug/follower', controller.getFollower);

router.patch('/:slug/follow', controller.followArtist);

module.exports = router;