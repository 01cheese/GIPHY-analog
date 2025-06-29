const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account',
    })
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false,
    }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id },
            process.env.JWT_SECRET || 'default_jwt_secret',
            { expiresIn: '1d' }
        );

        res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
    }
);

module.exports = router;
