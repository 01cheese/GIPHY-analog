const express = require('express');
const axios = require('axios');
const router = express.Router();

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const GIPHY_URL = 'https://api.giphy.com/v1/gifs';

router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const response = await axios.get(`${GIPHY_URL}/search`, {
            params: {
                api_key: GIPHY_API_KEY,
                q,
                limit: 25,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/trending', async (req, res) => {
    try {
        const response = await axios.get(`${GIPHY_URL}/trending`, {
            params: {
                api_key: GIPHY_API_KEY,
                limit: 25,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/gif/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${GIPHY_URL}/${id}`, {
            params: { api_key: GIPHY_API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
