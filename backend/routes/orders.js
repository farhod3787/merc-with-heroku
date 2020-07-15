const express = require('express');
const Orders = require('../models/orders');
const Admin = require('../models/admin');
const Users = require('../models/users');
const Products = require('../models/products');
const router = express.Router();

router.post('/:token' , async(request, response, next) => {
    var body = request.body;
    var token = request.params.token;
    var users = await Users.find();

    var obj = Users.verifyOfUser(users, token);

    var order = {
        user_id: obj.userName,
        address: body.address,
        date: new Date().toISOString().
                        replace(/T/, ' ').
                        replace(/\..+/, ''),
        status: "Waiting",
        products: body.products,
        quantity: body.quantity,
        pay_type: body.pay_type,
        general_sum: body.general_sum
    }
    var new_order = new Orders(order);

    if (obj.isUser) {
        new_order.save().then(res => {
            response.status(200).json(res);
        }).catch(err => {
            console.log(err);
            response.status(400).json({ message: "Error in Saved Order" })
        })
    } else {
        response.status(400).json({ message: "This is not User" });
    }
});



// router.get('/getWaiting/:token', async(request, response, next) => {

//     var token = request.params.token;
//     var admins = await Admin.find();
//     var obj = await Admin.verifyOfAdmin(admins, token);
//     if(obj.isModerator) {
//     let orders = await Orders.find({status: 'Waiting'});
//     for ( let i = 0; i <= orders.length - 1; i++ ) {
//       var length = orders[i].products.length;
//       for ( let q = 0; q <= length - 1; q ++) {
//         var id = orders[i].products[q];
//        var result = await  Products.findById(id);
//       }
//     }
//     response.status(200).json(orders)
// }
// })



//   Xato Waitingda
router.get('/getWaiting/:token', async(request, response, next) => {

  var token = request.params.token;
  var admins = await Admin.find();
  var obj = await Admin.verifyOfAdmin(admins, token);
  if(obj.isModerator) {
  let orders = await Orders.find({status: 'Waiting'});
  for ( let i = 0; i <= orders.length - 1; i++ ) {
    var length = orders[i].products.length;
    for ( let q = 0; q <= length - 1; q ++) {
      var id = orders[i].products[q];
        const prod  =   await  Products.findById(id);
          orders[i].products[q] = prod.name_ru;
    }
  }
  response.status(200).json(orders)
}
})

router.get('/getSuccess/:token', async(request, response, next) => {

  var token = request.params.token;
  var admins = await Admin.find();
  var obj = await Admin.verifyOfAdmin(admins, token);
  if(obj.isModerator) {
  let orders = await Orders.find({status: 'Success'});
  for ( let i = 0; i <= orders.length - 1; i++ ) {
    var length = orders[i].products.length;
    for ( let q = 0; q <= length - 1; q ++) {
      var id = orders[i].products[q];
        const prod  =   await  Products.findById(id);
          orders[i].products[q] = prod.name_ru;
    }
  }
  response.status(200).json(orders)
}
})



router.get('/getOrder/:id/:token', async function(request, response, next) {
    var id = request.params.id;
    var token = request.params.token;
        var admins = await Admin.find();
        var obj = Admin.verifyOfAdmin(admins, token);

        if(obj.isModerator) {
                await Orders.findById(id).then((res) => {
                if (!res) {
                    response.status(400).json({ message: "Product Not found" });
                } else {
                    response.status(200).json(res);
                }
            }).catch((err) => {
                console.log(err);
                response.status(400).json({ message: "Product Not found" });
            })

        }
        else {
            response.status(400).json({ message: "It's not moderator" });
        }
})

router.delete('/deleteOrder/:id/:token', async function(request, response, next) {
    var id = request.params.id;
    var token = request.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isModerator) {
            await Orders.findByIdAndDelete(id).then((res) => {
                response.status(200).json({ message: "Order deleted!" });
            })
            .catch((err) => {
                console.log(err);
                response.status(400).json({ message: "Error in delete Order" });
            })
    } else {
        console.log(obj)
        response.status(400).json({ message: "This is not Moderator" });
    }
})

// Status o'zgartirish

router.patch('/updateStatus/:id/:token', async function(request, response) {
    var id = request.params.id;
    var token = request.params.token;
    var admin = await Admin.find();
    var obj = Admin.verifyOfAdmin(admin, token);
    let body = {};
    if (obj.isModerator) {
        body.status = "Success";
        Orders.findByIdAndUpdate(id, { $set: body }, { new: true }).then(res => {
            if (res) {
                response.status(200).json({ message: "Status: Success" })
            } else {
                response.status(400).json({ message: "Error in status" })
            }
        }).catch(err => {
            console.log(err);
            response.status(400).json(err);
        })
}
else {
    response.status(400).json({message: "It's not Moderator"});
}
})

module.exports = router;
