const Artist = require('../models/artist.model');
const Song = require('../models/song.model');
const User = require('../models/user.model');

const mongoose = require('mongoose');

class ArtistController {
    async getAllArtist(req, res) {
        const artists = await Artist.find({});

        return res.status(200).send(artists);
    }

    async getArtist(req, res) {
        const slug = req.params.slug;

        const artist = await Artist.findOne({artistSlug: slug});
        
        if(!artist) return res.status(400).send(`No artist with ${slug}`);
        
        const songs = await Song.find({artist: artist.name});

        return res.status(200).json({artist: artist, songs: songs});
    }

    async followArtist(req, res) {
        const slug = req.params.slug;
        const artist = await Artist.findOne({artistSlug: slug});

        if(!artist) return res.status(400).send(`No artist with ${slug}`);
        
        if(!artist.follower.includes(req.body.userId)) {
            await artist.updateOne({
                $push: { follower: req.body.userId },
                $inc: { followerCount: 1 }
            })
            return res.status(200).send('The artist has been followed');
        } else {
            await artist.updateOne({
                $pull: { follower: req.body.userId },
                $inc: { followerCount: -1 }
            })
            return res.status(200).send('The artist has been unfollowed');
        }
    }

    async getFollower(req, res) {
        const slug = req.params.slug;
        const artist = await Artist.findOne({artistSlug: slug});

        if(!artist) return res.status(400).send(`No artist with ${slug}`);

        return res.status(200).json({
            follower: artist.follower, 
            followerCount: artist.followerCount
        })
    }
}
module.exports = new ArtistController();