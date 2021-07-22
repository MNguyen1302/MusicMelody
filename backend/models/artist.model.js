const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const artistSchema = new Schema({
    name: { type: String, required: true},
    genre: { type: String},
    image: { type: String, required: true},
    description: { type: String, required: true},
    artistSlug: { type: String, slug: 'name', unique: true},
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    followerCount: { type: Number, default: 0}
},{
    timestamps: true
})

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;