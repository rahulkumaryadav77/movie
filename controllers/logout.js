const User = require('../models/user');

module.exports = {
    logout: (req, res, next) => {
        // res.send("hlll");
        req.logout(e => {
            if(e) throw("LOGOUT ERROR");
        });
        req.flash('success', 'Logged out successfully!');
        res.redirect('/login');
    }
}