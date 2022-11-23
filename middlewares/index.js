const Playlist = require('../models/playlist');

module.exports.isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const playlist = await Playlist.findById(id);
    //console.log(playlist);
    if (!playlist.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect('/home');
    }
    next();
}