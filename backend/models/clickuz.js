const { Schema, model } = require('mongoose');

const clickuzSchema = new Schema({
    userId: {type: String},
    click_trans_id: {type: Number},
    merchant_trans_id: {type: String},
    merchant_prepare_id: {type: String},
    sign_time: {type: String},
    sign_string: {type: String},
    click_paydoc_id: {type: String},
    amount: {type: Number},
});

module.exports = model('Clickuz', clickuzSchema);
