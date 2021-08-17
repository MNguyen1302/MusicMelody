require('dotenv');
const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if(!user) return res.status(400).json({ message: "User doesn't exist" })

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) return res.status(400).json({ message: "Wrong password" });
        
        const token = jwt.sign({ 
            email: user.email, 
            id: user._id, 
            name: user.name,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            avatar: user.avatar
        }, 'jwtsecret', { expiresIn: '24h' })

        return res.status(200).json({ user: user, token: token });
    }

    async register(req, res) {
        const { name, email, password, confirmPassword } = req.body;

        const existingUser = await User.findOne({ email: email });

        if(existingUser) return res.status(400).json({ message: "User already exist" });

        if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match" })

        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: name,
            email: email,
            password: req.body.password,
        })
        user.save();

        const token = jwt.sign({ email: user.email, id: user._id }, 'jwtsecret', { expiresIn: '24h' })
        
        return res.status(200).json({ user: user, token: token })
    }
    async loginGoogle(req, res) {
        const { tokenId } = req.body;
        const ticket = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        const { sub, email, name, picture, given_name, family_name } = payload;

        const user = await User.findOne({ googleId: sub });
        if(user) {
            res.status(200).json(user);
        } else {
            const newUser = new User({
                name,
                email,
                googleId: sub,
                avatar: picture,
                firstname: given_name,
                lastname: family_name
            }).save();
            res.status(200).json(newUser);
        }
    }
}
module.exports = new AuthController();