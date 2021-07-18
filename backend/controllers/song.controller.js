const Song = require('../models/song.model');
const Comment = require('../models/comment.model');

class SongController {
    async getAllSongs(req, res) {
        const songs = await Song.find({});
        return res.status(200).send(songs);        
    }

    async getSong(req, res) {
        const slug = req.params.slug;
        Song.findOne({slug: slug})
        .then(async song => {
            const comments = await Comment.find({songSlug: slug}).populate('userId').sort({date: -1})
            return res.status(200).json({song: song, comments: comments});
        })  
    }

    async getTopSong(req, res) {
        const songs = await Song.find({}).sort({ likeCount: -1})
        return res.status(200).send(songs);
    }

    async getCategory(req, res) {
        const type = req.params.type;
        const category = await Song.find({type: type});

        return res.status(200).send(category);  
    }

    async likeSong(req, res) {
        const slug = req.params.slug;
        const song = await Song.findOne({slug: slug});

        if(!song) return res.status(404).send(`No song with ${slug}`);

        if(!song.userLikes.includes(req.body.userId)) {
            await song.updateOne({ 
                $push: { userLikes: req.body.userId },
                $inc: { likeCount: 1 }
            });
            return res.status(200).send('The song has been liked');
        } else {
            await song.updateOne({ 
                $pull: { userLikes: req.body.userId },
                $inc: { likeCount: -1 }
            });
            return res.status(200).send('The song has been unliked');
        }
    }

    async getLikeSong(req, res) {
        const slug = req.params.slug;
        const song = await Song.findOne({slug: slug});

        return res.status(200).send(song.userLikes);
    }
}

module.exports = new SongController();