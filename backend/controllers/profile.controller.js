const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const cloudinary = require('../services/cloudinary');

class ProfileController {
    async update(req, res) {
        const id = req.params.id;

        if(req.files['avatar']) {
            let avatarPromises = req.files['avatar'].map(file => new Promise((resolve, reject) => {
                cloudinary.upload(file, 'avatar', 'image', resolve);
            }))

            const avatar = await Promise.all(avatarPromises);
            req.body.avatar = avatar[0].url;
        }

        User.updateOne({_id: id}, req.body)
            .then(() => {
                return res.status(200);
            })
            .catch(error => {
                return res.status(500).json({ message: error });
            })
    }

    async changePassword(req, res) {
        const id = req.params.id;
        const user = await User.findOne({_id: id});
    
        const salt = await bcrypt.genSalt();
        const validPassword = await bcrypt.compare(req.body.currentpassword, user.password);

        if(!req.body.currentpassword || !req.body.password || !req.body.confirmpassword) {
            return res.status(400).send(['error', 'One field is required']);
        }

        if(req.body.password !== req.body.confirmpassword) {
            return res.status(400).send(['error', 'Confirm password is not matching']);
        }
        if(!validPassword) {
            return res.status(400).send(['error', 'Current password was wrong'])
        }

        req.body.password = await bcrypt.hash(req.body.password, salt);
        User.updateOne({_id: id}, { password: req.body.password })
            .then(() => {
                return res.status(200).send(['success', 'Password has been changed']);
            })
            .catch(error => {
                return res.status(500).json({ message: error });
            })
    }

    async getProfile(req, res) {
        const id = req.params.id;

        if(!id) {
            res.status(400).send(false);
        }

        const user = await User.findById(id);
        if(user) {
            res.status(200).send(user);
        }
    }
}

module.exports = new ProfileController();