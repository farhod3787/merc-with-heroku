const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    name_uz: {type: String},
    name_ru: {type: String},
    description_uz: {type: String},
    description_ru: {type: String},
    image_original_name : {type: String},
    rating: {type: Number},
    date: {type: String}
});

module.exports = mongoose.model('news', newsSchema);
