const express = require('express');

const router = express.Router();

const controller = require('../controllers/profile.controller');

const upload = require('../middlewares/multer.middleware');

router.patch('/update/:id', upload, controller.update);

router.patch('/password/:id', controller.changePassword);

router.get('/user/:id', controller.getProfile);

module.exports = router;