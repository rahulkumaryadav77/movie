const User = require('../models/user');

module.exports = {
    getSignIn: (req, res) => {
        res.render('login');
    },
    signIn: async(req, res, next) => {
        const { username, password } = req.body;
        const { user } = await User.authenticate()(username, password);
        if(!user) {
            req.flash('error', 'Invalid username or password !'); 
            return res.redirect('/login'); 
        }
        req.logIn(user, function(err) {
            if (err) {
                req.flash('error', err.message);
                return res.redirect('/login');
            };
            res.redirect('/home');
        });
    }
}