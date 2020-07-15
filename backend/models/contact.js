const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},    
    number: {type: String},    
    message: {type: String},    
    date: {type: String}    
});

 
module.exports = mongoose.model('contact', contactSchema);