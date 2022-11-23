const User = require('../models/user');

module.exports = {
    getSignup: (req, res) => {
        res.render('register');
    },
    signUp: async(req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const user = new User({username, email});
            const registeredUser = await User.register(user, password);
            res.redirect('/home');
        } catch(err) {
            let error = err.message;
            if (error.includes('duplicate') || error.includes('index: email_1 dup key')) {
                req.flash('error', 'A user with the given email is already registered !');
                return res.redirect('/register');
            }
            req.flash('error', err.message);
            res.redirect('/register');
        }
    }
}