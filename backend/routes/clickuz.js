const { Router } = require('express');
const Clickuz = require('../models/clickuz');
const Users = require('../models/users');
const router = Router();

// clickdan keladigan /prepare so'rovni javobi
router.post('/prepare', (req, res) => {
  try {
    res.send({
      click_trans_id: req.body.click_trans_id,
      service_id: req.body.service_id,
      merchant_trans_id: req.body.merchant_trans_id,
      merchant_prepare_id: req.body.merchant_trans_id,
      error: req.body.error,
      error_note: req.body.error_note
    });
  } catch (err) {
    console.log(err);
  }
});

// to'lov o'tgandan keyin clickdan keladigan /complete so'rovining javobi va bazaga saqlab qo'yish kodi
router.post('/complete', async (req, res) => {
  try {
    const user = await Users.findById(req.body.merchant_trans_id);
    if(req.body.error == 0){
      const newClickuz = new Clickuz({
        userId: user._id,
        click_trans_id: req.body.click_trans_id,
        merchant_trans_id: req.body.merchant_trans_id,
        merchant_prepare_id: req.body.merchant_prepare_id,
        sign_time: req.body.sign_time,
        sign_string: req.body.sign_string,
        click_paydoc_id: req.body.click_paydoc_id,
        amount: req.body.amount
      });
      const clickuz = await newClickuz.save();
      console.log(clickuz);
    }
    res.send({
      click_trans_id: req.body.click_trans_id,
      merchant_trans_id: req.body.merchant_trans_id,
      merchant_confirm_id: req.body.merchant_prepare_id,
      error: req.body.error,
      error_note: req.body.error_note
    });
  } catch (err) {
      console.log(err);
  }
});

module.exports = router;

//Frontendchi to'lov qilinadigan sahifaga quidagi formani joylashtirishi kerak

{/* <form action="https://my.click.uz/services/pay" id="click_form" method="get" >
  <input type="hidden" name="amount" value="{{amount}}" />                          amount bu zakazni narxi
  <input type="hidden" name="merchant_id" value="{{merchant_id}}"/>                 merchant_id bu clickdan berilgan id
  <input type="hidden" name="merchant_user_id" value="{{merchant_user_id}}"/>       merchant_user_id clickdan berilgan id
  <input type="hidden" name="service_id" value="{{service_id}}"/>                   service_id clickdan berilgan id
  <input type="hidden" name="transaction_param" value="{{transaction_param}}"/>     bu yerga mijoznini logini yoki id sini kiriting
  <input type="hidden" name="return_url" value="{{return_url}}"/>                   to'lov qilingandan keyin klient o'tishi kerak bo'lgan URL
  <input type="hidden" name="card_type" value="{{card_type}}"/>                     karta turi, uzcard yoki humo
  <button type="submit" class="btn btn-success"><i></i>Оплатить через CLICK</button>
</form> */}
