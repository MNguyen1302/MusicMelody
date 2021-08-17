const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, default: 'https://res.cloudinary.com/mynguyen/image/upload/v1628607972/image/playlist_f8ky8g.jpg' },
    description: { type: String },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        default: []
    }],
    date: { type: Date }
}, {
    _id: true
})

const userSchema = new Schema({
    role: { type: String, default: 'user'},
    googleId: { type: String},
    name: { type: String, requried: true},
    avatar: { type: String, default: 'https://res.cloudinary.com/mynguyen/image/upload/v1628223206/avatar/noavatar_ztxku9.svg'},
    email: { type: String , required: true, unique: true, sparse:true},
    password: { type: String},
    firstname: { type: String},
    lastname: { type: String},
    address: { type: String},
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        default: [],
    }],
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        default: [],
    }],
    playlists: [playlistSchema]
})
const User = mongoose.model('User', userSchema);
module.exports = User;