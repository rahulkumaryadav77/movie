const express = require('express');
const router = express.Router();
const { home, playlist, showPlaylist, addMovie } = require('../controllers/index');
const { isAuthenticated, isAuthor } = require('../middlewares/index');

router.get('/home', isAuthenticated, home);
router.post('/myPlaylist', isAuthenticated, playlist);
router.get('/myPlaylist/:id', isAuthenticated, showPlaylist);
router.post('/myPlaylist/:id/addmovie', isAuthenticated, isAuthor, addMovie);

module.exports = router; 