const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name_uz: {type: String},    
    name_ru: {type: String}    
});

 
module.exports = mongoose.model('category', categorySchema);