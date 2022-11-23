const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    playlistName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    movies: Array,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Playlist', PlaylistSchema);