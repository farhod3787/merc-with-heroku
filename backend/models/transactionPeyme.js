const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
  user_id: {type: String},
  paycom_transaction_id: {type: String},
  paycom_time: {type: String},
  paycom_time_datetime: {type: Date},
  create_time: {type: Date},
  amount: {type: Number},
  state: {type: Number, enum: [-2,-1,0,1,2]},
  receivers: {type: String},
  order_id: {type: Number}
});

module.exports = model('Transaction', transactionSchema);
