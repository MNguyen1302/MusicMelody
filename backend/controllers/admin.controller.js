const User = require('../models/user.model');
const Song = require('../models/song.model');
const Artist = require('../models/artist.model');

const cloudinary = require('../services/cloudinary');

class AdminController {
    async store(req, res) {
        const user = await User.findOne({_id: req.query.userId});
        const songs = await Song.find({writerId: user._id});

        return res.status(200).send(songs);
    }

    async createSong(req, res) {
        const user = await User.findOne({_id: req.body.id});

        if(!req.body.name || !req.body.artist || !req.body.composer || !req.body.lyric || !req.files['audio'] || !req.files['image']) {
            return res.status(400).send(['error', 'One field is required'])
        }

        let audioPromises = req.files['audio'].map(file => new Promise((resolve, reject) => {
            cloudinary.upload(file, 'audio', 'video', resolve);
        }))

        let imagePromises = req.files['image'].map(file => new Promise((resolve, reject) => {
            cloudinary.upload(file, 'image', 'image', resolve);
        }))

        const audio = await Promise.all(audioPromises);
        const image = await Promise.all(imagePromises);


        const song = new Song({
            name: req.body.name,
            artist: req.body.artist,
            composer: req.body.composer,
            lyric: req.body.lyric,
            type: req.body.type,
            image: image[0].url,
            audio: audio[0].url,
            writerId: user._id
        })
        song.save()
            .then(() => {
                return res.status(200).send(['success', 'Post Success'])
            })
            .catch(error => {
                return res.status(400).send(error)
            })
    }

    async createArtist(req, res) {
        if(!req.body.name || !req.body.description || !req.body.genre || !req.files['image']) {
            return res.status(400).send(['error', 'One field is required'])
        }

        let imagePromises = req.files['image'].map(file => new Promise((resolve, reject) => {
            cloudinary.upload(file, 'image', 'image', resolve);
        }))

        const image = await Promise.all(imagePromises);

        const artist = new Artist({
            name: req.body.name,
            description: req.body.description,
            genre: req.body.genre,
            image: image[0].url,
        })
        artist.save()
            .then(() => {
                return res.status(200).send('success')
            })
            .catch(error => {
                return res.status(400).send(error)
            })
    }

    async editSong(req, res) {
        if(req.files['audio']) {
            let audioPromises = req.files['audio'].map(file => new Promise((resolve, reject) => {
                cloudinary.upload(file, 'audio', 'video', resolve);
            }))

            const audio = await Promise.all(audioPromises);
            req.body.audio = audio[0].url;
        }

        if(req.files['image']) {
            let imagePromises = req.files['image'].map(file => new Promise((resolve, reject) => {
                cloudinary.upload(file, 'image', 'image', resolve);
            }))

            const image = await Promise.all(imagePromises);
            req.body.image = image[0].url;
        }
        console.log(req.body.image);

        Song.updateOne({slug: req.params.slug}, req.body)
            .then(() => {
                return res.status(200).send('success')
            })
            .catch(error => {
                return res.status(500).send(error);
            })
    }

    async deleteSong(req, res) {
        const id = req.params.id;
        const song = await Song.findOne({_id: id})
        Song.deleteOne({_id: id})
            .then(() => {
                return res.status(200).send(['success', 'Delete song successfully'])
            })
            .catch(error => {
                return res.status(500).send(error)
            })
    }

}

module.exports = new AdminController();