const Artist = require('../models/artist.model');
const Song = require('../models/song.model');
const mongoose = require('mongoose');

class ArtistController {
    async getAllArtist(req, res) {
        const artists = await Artist.find({});
        return res.status(200).send(artists);
    }

    // async getSongOf(req, res) {
    //     const songs = await Song.find({artist: req.body.name});
    //     return res.status(200).send(songs);
        
    // }

    async getArtist(req, res) {
        const id = mongoose.Types.ObjectId(req.params.id);
        const artist = await Artist.findOne({_id: id});
        const songs = await Song.find({artist: artist.name})

        return res.status(200).json({artist: artist, songs: songs});
    }
}
module.exports = new ArtistController();