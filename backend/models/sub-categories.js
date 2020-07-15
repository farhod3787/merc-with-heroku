const mongoose = require('mongoose');

const sub_categorySchema = mongoose.Schema({
    name_uz: {type: String},
    name_ru: {type: String},
    category_id : {type: String}
});


module.exports = mongoose.model('sub-category', sub_categorySchema);
