const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/auth');

router.use(authenticate);

router.get('/me', async (req, res) => {
    res.json(req.user);
});

router.get('/favorites', async (req, res) => {
    res.json(req.user.favorites);
});


router.get('/saved-gifs', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const arr  = user.savedGifs || [];
        return res.json(arr.slice(0, 100));
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.post('/save-gif', async (req, res) => {
    const { gif } = req.body;
    if (!gif?.id) return res.status(400).json({ message: 'Missing gif data' });

    try {
        const user = await User.findById(req.user.id);
        const minimal = { id: gif.id, title: gif.title, url: gif.url };
        if (user.savedGifs.some(g => g.id === minimal.id)) {
            return res.status(409).json({ message: 'Already saved' });
        }
        user.savedGifs.unshift(minimal);
        user.savedGifs = user.savedGifs.slice(0, 100);

        await user.save();
        res.json({ message: 'Saved link only' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});
router.delete('/remove-gif/:id', async (req, res) => {
    const { id } = req.params;
    try {
        req.user.favorites = req.user.favorites.filter(gif => gif.id !== id);
        await req.user.save();
        res.json({ message: 'Removed successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
