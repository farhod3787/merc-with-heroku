const express = require('express');

const Transaction = require('../models/transactions');
const Order = require('../models/orders');
const User = require('../models/users');
const md5 = require('md5');

const router = express.Router();

router.get('/test', async function(request, response) {
  let item = {
    rate: 500,
    date: "Thu Aug 15 2019 14:43:52 GMT+0000 (Coordinated Universal Time)",
    status: "Waiting",
    payType: "Naqd",
    forward: "Uy yoki office ga eltish",
    address: "progresspro",
    telnumber: "+998933369322"
  };
  let order = new Order(item);
  order.save().then( async obj =>{
    let res = {
      'status' : 'ok'
    };
    response.status(200).json(res);
  }).catch( err =>{
    console.log(err);
  });

  let item2 = {
    rate: 10,
    date: "Thu Aug 15 2019 14:43:52 GMT+0000 (Coordinated Universal Time)",
    status: "Waiting",
    payType: "Naqd",
    forward: "Uy yoki office ga eltish",
    address: "progresspro",
    telnumber: "+998933369322"
  };
  let order2 = new Order(item2);
  order2.save().then( async obj =>{
    let res = {
      'status' : 'ok'
    };
    response.status(200).json(res);
  }).catch( err =>{
    console.log(err);
  });
});

router.post('/paycom', async function(request, response) {
    //ERRORS
    let errors = {
      '31001': {
        code: -31001,
        message: {
          ru: 'Неверная сумма',
          uz: 'Неверная сумма',
          en: 'Неверная сумма'
        },
        data: null
      },
      '31003': {
        code: -31003,
        message: {
          ru: 'Транзакция не найдена',
          uz: 'Транзакция не найдена',
          en: 'Транзакция не найдена'
        },
        data: null
      },
      '31007': {
        code: -31007,
        message: {
          ru: 'Невозможно отменить транзакцию, заказ выполнен',
          uz: 'Невозможно отменить транзакцию, заказ выполнен',
          en: 'Невозможно отменить транзакцию, заказ выполнен'
        },
        data: null
      },
      '31008': {
        code: -31008,
        message: {
          ru: 'Невозможно выполнить данную операцию',
          uz: 'Невозможно выполнить данную операцию',
          en: 'Невозможно выполнить данную операцию'
        },
        data: null
      },
      '31050': {
        code: -31050,
        message: {
          ru: 'Заказ не найден',
          uz: 'Заказ не найден',
          en: 'Заказ не найден'
        },
        data: 'order_id'
      },
      '31099': {
        code: -31099,
        message: {
          ru: 'Заказ уже оплачен или в ожидании платежа',
          uz: 'Заказ уже оплачен или в ожидании платежа',
          en: 'Заказ уже оплачен или в ожидании платежа'
        },
        data: 'order_id'
      },
      '32504': {
        code: -32504,
        message: {
          ru: 'Неправильный пароль',
          uz: 'Неправильный пароль',
          en: 'Неправильный пароль'
        },
        data: null
      }
    };

    // const paycom_password = 'W57OmRPUTmPXGgmZ@ZGOTrkxTzaO%q@KywKx';
    const paycom_password = 'nX12IGqdptWDNk7CWV2mcIF9zwCwG9S4JnI9';
    const username = 'Paycom';

    // parse login and password from headers
    // const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
    // const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');
    const login = request.body.login;
    const password = request.body.password;

    // Verify login and password are set and correct
    if (!(login && password && login === username && password === paycom_password)) {
        let res = {
            'error': errors['32504'],
            'result': null,
            'id': request.body.id
        };
        response.status(200).json(res);
    }
    const id = request.body.id;
    // const transaction_id = request.body.params.id;
    // const amount = Math.floor(request.body.params.amount / 100);
    // const order_id = (request.body.params.account !== undefined) ? request.body.params.account.order_id : null;
    // const time = request.body.params.time;

    const transaction_id = '123321123321';
    const amount = Math.floor(request.body.amount / 100);
    const order_id = (request.body.account !== undefined) ? request.body.order_id : null;
    const time = new Date()

    let transaction = {};
    let order;

    switch (request.body.method)
    {
        case "CheckPerformTransaction":
            await Order.findById(order_id).then( async obj => {
              order = obj;
            }).catch( err => {
              console.log(err);
              let res = {
                'error': errors['31050'],
                'result': null,
                'id': id
              };
              response.status(200).json(res);
            });

            //check amount
            if( amount !== order.rate ) {
              let res = {
                'error': errors['31001'],
                'result': null,
                'id': id
              };
              response.status(200).json(res);
            } else {
              let res = {
                'error': null,
                'result': {
                  'allow': true
                },
                'id': id
              };
              response.status(200).json(res);
            }
            break;

        case "CreateTransaction":
            await Transaction.findOne({paycom_id: transaction_id }).then(obj => {
              transaction = obj;
              // console.log(transaction);
            }).catch(async err => {
              // console.log(err);
            });
           await Order.findById(order_id).then( async obj => {
            order = obj;
          }).catch( err => {
            console.log(err);
            let res = {
              'error': errors['31050'],
              'result': null,
              'id': id
            };
            response.status(200).json(res);
          });

          //check amount
          if( amount !== order.general_sum ) {
            let res = {
              'error': errors['31001'],
              'result': null,
              'id': id
            };
            response.status(200).json(res);
          }

            if( transaction == null ){
              let newitem = {
                order_id: order_id,
                status: 1,
                pay_method : 'paycom',
                date_add : new Date().getTime(),
                paycom_state : 1,
                paycom_create_time : time,
                paycom_id : transaction_id,
                amount : amount,
              };
              transaction = new Transaction(newitem);
              transaction.save().then( async obj =>{
                let res = {
                  'error': null,
                  'result': {
                    'create_time': time,
                    'transaction': order_id,
                    'state': 1
                  },
                  'id': id
                };
                response.status(200).json(res);
              }).catch( err =>{
                // console.log(err);
              });
            } else {
              if(transaction.order_id !== order_id){
                console.log('order');
                let res = {
                  'error': errors['31050'],
                  'result': null,
                  'id': id
                };
                response.status(200).json(res);
              } else if(transaction.paycom_state !== '1'){
                console.log(transaction.paycom_state);
                let res = {
                  'error': errors['31008'],
                  'result': null,
                  'id': id
                };
                response.status(200).json(res);
              } else if( (parseInt(parseInt(time) / 1000)-parseInt(parseInt(transaction.paycom_create_time) / 1000))/3600>12 ){
                console.log('time');
                transaction.paycom_reason = 4;
                transaction.paycom_state = -1;
                transaction.save().then( obj =>{
                }).catch( err =>{
                  console.log(err);
                });

                let res = {
                  'error': errors['31008'],
                  'result': null,
                  'id': id
                };
                response.status(200).json(res);
              } else {
                let res = {
                  'error': null,
                  'result': {
                    'create_time': time,
                    'transaction': order_id,
                    'state': 1
                  },
                  'id': id
                };
                response.status(200).json(res);
              }
            }
            break;
        case "PerformTransaction":
            await Transaction.findOne({paycom_id: transaction_id }).then(obj => {
              transaction = obj;
              console.log(transaction);
            }).catch( err => {
            });
            if( transaction == null ) {
              let res = {
                'error': errors['31003'],
                'result': null,
                'id': id
              };
              response.status(200).json(res);
            } else {
                if(transaction.paycom_state !== '1'){
                  if (transaction.paycom_state !== '2') {
                    let res = {
                      'error': errors['31008'],
                      'result': null,
                      'id': id
                    };
                    response.status(200).json(res);
                  } else {
                    let res = {
                      'error': null,
                      'result': {
                        'perform_time': parseInt(transaction.paycom_perform_time),
                        'transaction': transaction.order_id,
                        'state': 2
                      },
                      'id': id
                    };
                    response.status(200).json(res);
                  }
                } else {
                  if ((parseInt(transaction.paycom_perform_time) / 1000) / 3600 > 12 && transaction.paycom_perform_time !== '0') {
                    transaction.paycom_reason = 4;
                    transaction.paycom_state = -1;
                    transaction.save().then( obj =>{
                    }).catch( err =>{
                      console.log(err);
                    });

                    let res = {
                      'error': errors['31008'],
                      'result': null,
                      'id': id
                    };
                    response.status(200).json(res);
                  } else {
                    //Оплачиваем заказ
                    //Запись 'perform time'
                    let curTime = new Date().getTime();
                    console.log(curTime);

                    transaction.status = 2;
                    transaction.paycom_state = 2;
                    transaction.paycom_perform_time = curTime;
                    transaction.save().then( obj =>{
                    }).catch( err =>{
                      console.log(err);
                    });

                    /*Снятие средств, оплачиваем тут*/
                    let sum = Math.round(parseInt(amount) / 100);
                    await Order.findById(transaction.order_id).then( async obj => {
                      obj.status = 'Doing';
                      obj.save().then( obj =>{
                        console.log(obj);
                      }).catch( err =>{
                        console.log(err);
                      });
                    }).catch( err => {
                      console.log(err);
                    });
                    let result = {
                      'error': null,
                      'result': {
                        'perform_time': parseInt(curTime),
                        'transaction': transaction.order_id,
                        'state': 2,
                      },
                      'id': id
                    };
                    response.status(200).json(result);
                  }
                }
            }

            break;
        case "CancelTransaction":
            await Transaction.findOne({paycom_id: transaction_id }).then(obj => {
              transaction = obj;
              console.log(transaction);
            }).catch( err => {
            });

            if( transaction == null ) {
              let res = {
                'error': errors['31003'],
                'result': null,
                'id': id
              };
              response.status(200).json(res);
            } else {
              if (transaction.paycom_state === 2) {
                let res = {
                  'error': errors['31007'],
                  'result': null,
                  'id': id
                };
                response.status(200).json(res);
              } else {
                let cancelTime = parseInt(new Date().getTime());

                let state = transaction.paycom_state ==='1' || transaction.paycom_state === '-1' ? -1 : -2;
                await Order.findById(transaction.order_id).then( async obj => {
                  obj.status = 'Waiting';
                  obj.save().then( obj =>{
                    console.log(obj);
                  }).catch( err =>{
                    console.log(err);
                  });
                }).catch( err => {
                  console.log(err);
                });

                let result = {
                  'error': null,
                  'result': {
                    'cancel_time': cancelTime,
                    'transaction': transaction.order_id,
                    'state': state,
                  },
                  'id': id
                };
                response.status(200).json(result);
              }
            }
            break;
      case "CheckTransaction":
               await Transaction.findOne({paycom_id: transaction_id }).then(obj => {
                 transaction = obj;
                 console.log(transaction);
               }).catch( err => {
               });

               if( transaction == null ) {
                 let res = {
                   'error': errors['31003'],
                   'result': null,
                   'id': id
                 };
                 response.status(200).json(res);
               }

               let canceltime;
               if(transaction.paycom_cancel_time !== undefined) canceltime = parseInt(transaction.paycom_cancel_time);
               else canceltime = 0;

              let result = {
                'error': null,
                'result': {
                  'create_time': parseInt(transaction.paycom_create_time),
                  'perform_time': Math.floor(parseInt(transaction.paycom_perform_time) / 1000),
                  'cancel_time': canceltime,
                  'transaction': transaction.order_id,
                  'state': parseInt(transaction.paycom_state),
                  'reason': parseInt(transaction.paycom_reason)
                },
                'id': id
              };
              response.status(200).json(result);

            console.log(transaction);
            break;
    }
});

router.post('/click', async function(request, response) {
  //ERRORS
  const messages = [
    {
      error: '0',
      error_note: 'success'
    },
    {
      error: '-1',
      error_note: 'SIGN CHECK FAILED!\tОшибка проверки подписи'
    },
    {
      error: '-2',
      error_note: 'Incorrect parameter amount\tНеверная сумма оплаты'
    },
    {
      error: '-3',
      error_note: 'Action not found\tЗапрашиваемое действие не найдено'
    },
    {
      error: '-4',
      error_note: 'Already paid\tТранзакция ранее была подтверждена (при попытке подтвердить или отменить ранее подтвержденную транзакцию)'
    },
    {
      error: '-5',
      error_note: 'Order does not exist\tНе найдет заказ (проверка параметра merchant_trans_id'
    },
    {
      error: '-6',
      error_note: 'Transaction does not exist\tНе найдена транзакция (проверка параметра merchant_prepare_id)Action not found'
    },
    {
      error: '-7',
      error_note: 'Failed to update user\tОшибка при изменении данных пользователя (изменение баланса счета и т.п.)'
    },
    {
      error: '-8',
      error_note: 'Error in request from click Ошибка в запросе от CLICK (переданы не все параметры и т.п.)'
    },
    {
      error: '-9',
      error_note: 'Transaction cancelled\tТранзакция ранее была отменена (При попытке подтвердить или отменить ранее отмененную транзакцию)'
    },
    {
      error: '-10',
      error_note: 'Неизвесная ошибка'
    }
  ];

  let click_trans_id = request.body.click_trans_id;
  if( click_trans_id !== '' ){
    let merchant_trans_id = request.body.merchant_trans_id; //id заказа
    let merchant_prepare_id = request.body.merchant_prepare_id !== '' ? request.body.merchant_prepare_id : null;
    let amount = request.body.amount;
    let action = parseInt(request.body.action);
    let sign_time = request.body.sign_time;
    let error_code = request.body.error;
    let sign_string = request.body.sign_string;

    const secret = "EeFusZRTAl";
    const serviceID = 14826;

    let order; let transaction;
    await Order.findById(merchant_trans_id).then( async obj => {
      order = obj;
    }).catch( err => {
      console.log(err);
      response.status(200).json(messages[5]);
    });

    if( order.rate !== parseInt(amount) ){
      response.status(200).json(messages[2]);
    }

    if( order.status !== 'Waiting' ){
      response.status(200).json(messages[4]);
    }

    await Transaction.findOne({order_id: merchant_trans_id, status: 0 }).then(obj => {
      transaction = obj;
    }).catch( err => {
    });

    if( transaction == null ){
      let newitem = {
        order_id: merchant_trans_id,
        status: 0,
        pay_method : 'click',
        date_add : new Date().getTime(),
      };
      transaction = new Transaction(newitem);
      transaction.save().then( async obj =>{
        transaction = obj;
      }).catch( err =>{
        console.log(err);
      });
    }

    if(merchant_prepare_id !== null && merchant_prepare_id !== merchant_trans_id) {
      response.status(200).json(messages[6]);
    }

    let sign_string_veryfied = md5( click_trans_id +
    serviceID +
    secret +
    merchant_trans_id +
    (action === 1 ? merchant_trans_id : '') +
      amount +
      action +
      sign_time );

    if(sign_string !== sign_string_veryfied ){
      response.status(200).json(messages[1]);
    }

    if( [0,1].indexOf(action) === -1 ){
      response.status(200).json(messages[3]);
    }

    if( action === 0 ){
      merchant_prepare_id = merchant_trans_id;

      let return_array = {
        'click_trans_id': click_trans_id,// ID Click Trans
        'merchant_trans_id': merchant_trans_id,  // ID платежа в биллинге Поставщика
        'merchant_prepare_id': merchant_prepare_id
      };

      response.status(200).json(Object.assign({}, return_array, messages[0]));
    } else if( action === 1 ){
      if( error_code === 0 ){
        transaction.status = 3;
        transaction.save().then( obj =>{
        }).catch( err =>{
          console.log(err);
        });
        response.status(200).json(messages[9]);
      } else {
        /**
         * Заказ оплачен
         **/
        let return_array = {
          'click_trans_id': click_trans_id,// ID Click Trans
          'merchant_trans_id': merchant_trans_id,  // ID платежа в биллинге Поставщика
          'merchant_confirm_id': merchant_trans_id
        };

        //2-Оплата
        transaction.status = 2;
        transaction.amount = amount;
        transaction.save().then( obj =>{
          order.status = 'Doing';
          order.save().then( obj =>{
          }).catch( err =>{
            response.status(200).json(messages[7]);
          });
        }).catch( err =>{
          response.status(200).json(messages[7]);
        });
        response.status(200).json(Object.assign({}, return_array, messages[0]));
      }
    } else {
      response.status(200).json(messages[3]);
    }
  } else {
    response.status(200).json(messages[8]);
  }
});

module.exports = router;
