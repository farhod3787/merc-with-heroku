const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  order_id: {type: String},
  status: {type: Number},
  pay_method : {type: String},
  date_add : {type: String},
  paycom_state : {type: String},
  paycom_create_time : {type: String},
  paycom_id : {type: String},
  paycom_perform_time : {type: String},
  paycom_reason : {type: String},
  paycom_cancel_time : {type: String},
  amount : {type: String},
  paynet_transaction_dt : {type: String},
  paynet_transaction_time : {type: String},
  service_id : {type: String},
  paynet_transaction_id : {type: String},
  created_at : {type: String},
});

module.exports =mongoose.model('transactions', transactionSchema) ;
