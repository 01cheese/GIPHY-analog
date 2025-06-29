const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    avatar: String,
    favorites: [
        {
            id: String,
            url: String,
            title: String,
            category: String,
        }
    ],
    recentSearches: [String],
    savedGifs: [{
        id:    String,
        title: String,
        url:   String
    }]
});

module.exports = mongoose.model('User', userSchema);
