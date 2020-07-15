const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    user_id : {type: String},
    address: {type: String},
    date: {type: String},
    status: {type: String},
    products: {type: Array},
    quantity: {type: Array},
    pay_type: {type: String},
    general_sum: {type: Number}
});


module.exports = mongoose.model('orders', ordersSchema);
