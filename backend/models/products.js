const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name_uz: {type: String},
    name_ru: {type: String},
    description_uz: {type: String},
    description_ru: {type: String},
    id_number: {type: String},
    image_original_name : {type: String},
    category_id: {type: String},
    subcategory_id: {type: String},
    quantity: {type: Number},  //miqdori
    brand: {type: String},
    model: {type: String},
    configuration: {type: String},
    price: {type: Number},
    sale: {type: Number},
    rating: {type: Number},
    date: {type: String}
});




module.exports = mongoose.model('products', productSchema);
