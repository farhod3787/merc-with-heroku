// url = 'http://localhost:5000';
url = 'https://merc-with-paycom.herokuapp.com';

// database = 'mongodb://localhost:27017/mercedec';
database = 'mongodb+srv://farhod:7Q8SfcHx.F2J.HG@cluster0-uf7cc.mongodb.net/mercedec?retryWrites=true';

//Click billing parametrlari
service_id = 16067;
merchant_id = 11547;
secret_key = '4Yio3zkuxdEcrw';
merchant_user_id = 16670;

module.exports = {
  url,
  database,
  service_id,
  merchant_id,
  secret_key,
  merchant_user_id
}
