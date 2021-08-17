const User = require('../models/user.model');
const Song = require('../models/song.model');

const cloudinary = require('../services/cloudinary');

class PlaylistController {
    async createPlaylist(req, res) {
        const id = req.params.userId;
        const user = await User.findById(id);
        
        const index = user.playlists.length + 1;

        user.playlists.push({
            name: `Playlist #${index}`,
            date: new Date()
        })

        user.save();
        res.status(200).send(user.playlists);
    }

    async getPlaylist(req, res) {
        const id = req.params.userId;
        const user = await User.findById(id);

        if(!user) res.status(400).send(`No user with ${id}`);
        res.status(200).send(user.playlists);
    }

    async getPlaylistDetail(req, res) {
        const id = req.params.id;
        const user = await User.findOne({ _id: req.body.userId, playlists: { $elemMatch: { _id: id } } }, 
            { 'playlists.$': 1 }    
        )
        .populate({ 
            path: 'playlists',
            populate: {
                path: 'songs',
                model: 'Song'
            }
        });
        
        res.status(200).send(user.playlists[0]);
    }

    async addToPlaylist(req, res) {
        const id = req.params.id;
        const slug = req.body.slug;
        
        const song = await Song.findOne({ slug });

        const user = await User.updateOne({
            "_id": req.body.userId,
            "playlists._id": id
        },
        {   
            "$push": {
                "playlists.$.songs": song._id
            }
        })

        const newUser = await User.findOne({ _id: req.body.userId, playlists: { $elemMatch: { _id: id } } }, 
            { 'playlists.$': 1 }    
        )
        .populate({ 
            path: 'playlists',
            populate: {
                path: 'songs',
                model: 'Song'
            }
        })
        res.status(200).send(newUser.playlists[0]);
    }

    async removeFromPlaylist(req, res) {
        const id = req.params.id;
        const slug = req.body.slug;
        
        const song = await Song.findOne({ slug });

        const user = await User.updateOne({
            "_id": req.body.userId,
            "playlists._id": id
        },
        {   
            "$pull": {
                "playlists.$.songs": song._id
            }
        })

        const newUser = await User.findOne({ _id: req.body.userId, playlists: { $elemMatch: { _id: id } } }, 
            { 'playlists.$': 1 }    
        )
        .populate({ 
            path: 'playlists',
            populate: {
                path: 'songs',
                model: 'Song'
            }
        })
        res.status(200).send(newUser.playlists[0]);
    }

    async updatePlaylist(req, res) {
        const id = req.params.id;
        const userId = req.params.userId;

        if(req.files['image']) {
            let imagePromises = req.files['image'].map(file => new Promise((resolve, reject) => {
                cloudinary.upload(file, 'image', 'image', resolve);
            }))

            const image = await Promise.all(imagePromises);
            req.body.image = image[0].url;
        }
        
        let updateObj = {$set: {}};
        for(var param in req.body) {
            updateObj.$set['playlists.$.'+ param] = req.body[param];
        }

        await User.updateOne({
            "_id": userId,
            "playlists._id": id
        }, updateObj)

        const newUser = await User.findOne({ _id: userId, playlists: { $elemMatch: { _id: id } } }, 
            { 'playlists.$': 1 }    
        )
        .populate({ 
            path: 'playlists',
            populate: {
                path: 'songs',
                model: 'Song'
            }
        })
        res.status(200).send(newUser.playlists[0]);
    }
}
module.exports = new PlaylistController();