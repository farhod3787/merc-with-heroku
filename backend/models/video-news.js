const mongoose = require('mongoose');

const video_newsSchema = mongoose.Schema({
    url: {type: String},
    date: {type: String}
});

module.exports = mongoose.model('video-news', video_newsSchema);
