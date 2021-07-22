const express = require('express');

const router = express.Router();

const controller = require('../controllers/user.controller');

const upload = require('../middlewares/multer.middleware');

router.patch('/update/:id', upload, controller.updateProfile);

router.patch('/password/:id', controller.changePassword);

router.get('/:id', controller.getUser);

router.get('/:id/getFavourites', controller.getFavourites);

module.exports = router;