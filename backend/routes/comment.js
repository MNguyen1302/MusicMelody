const express = require('express');

const router = express.Router();

const controller = require('../controllers/comment.controller');

router.post('/:slug', controller.post);

module.exports = router;