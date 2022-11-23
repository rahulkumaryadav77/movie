const axios = require('axios');
const Playlist = require('../models/playlist');
const API_KEY = '5945762e';

module.exports = {
    home: async(req, res) => {
        try {
            const playlists = await Playlist.find().populate('author');
            res.render('index', { playlists });
        } catch (err) {
            req.flash('error', err.message);
            res.redirect('/home');
        }
    },
    playlist: async(req, res) => {
        try {
            const { playlistName, description, isPublic } = req.body;
            const playlist = new Playlist({ playlistName, description, author: req.user._id, isPublic });
            // console.log(playlist)
            await playlist.save();
            req.flash('success', 'Playlist successfuly created!');
            res.redirect('/home');
        } catch (err) {
            req.flash('error', err.message);
            res.redirect('/home');
        }
    },
    showPlaylist: async(req, res) => {
        try {
            if(req.query.movie) {
                const { movie } = req.query;
                const playlist = await Playlist.findOne({ _id: req.params.id }).populate('author');
                const data = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`);
                // console.log(data.data);
                res.render('playlist', { movie: data.data, playlist });
            } else {
                const playlist = await Playlist.findOne({ _id: req.params.id }).populate('author');
                res.render('playlist', { movie: req.query.movie, playlist });
            }
        } catch (err) {
            req.flash('error', err.message);
            res.redirect('/home');
        }
    },
    addMovie: async(req, res) => {
        try {
            const { movie } = req.body;
            // console.log(JSON.parse(movie));
            const playlist = await Playlist.findOne({ _id: req.params.id });
            playlist.movies.push(JSON.parse(movie));
            await playlist.save();
            req.flash('success', `Movie added to ${playlist.playlistName} successfuly!`);
            res.redirect(`/myPlaylist/${playlist._id}`);
        } catch (err) {
            req.flash('error', err.message);
            res.redirect('/home');
        }
    }
}