const express = require('express');
const Contact = require('../models/contact');
const Admin = require('../models/admin');
const router = express.Router();

 //                                                               R e g i  s t r a t s i o n
router.post('/', async function (request, response, next) {
   var body = request.body;

    let contact = {
        name : body.name,
        email: body.email,
        number: body.number,
        message: body.message,
        date: new Date().toISOString().
                        replace(/T/, ' ').
                        replace(/\..+/, '')
    }
    const contact_new = new Contact(contact);

    contact_new.save().then( (res) =>{
        response.status(200).json({message: "New contact saved"})
    }).catch( err =>{
        console.log(err);
        response.status(404).json({message: "Error in Saved Category"})
    })
});

router.post('/call-back', async function (request, response, next) {
  var body = request.body;
  var email = 'Call Back Please ! '
   let contact = {
       name : body.name,
       email: email,
       number: body.number,
       message: body.message,
       date: new Date().toISOString().
                       replace(/T/, ' ').
                       replace(/\..+/, '')
   }
   const contact_new = new Contact(contact);

   contact_new.save().then( (res) =>{
       response.status(200).json({message: "New contact saved"})
   }).catch( err =>{
       console.log(err);
       response.status(404).json({message: "Error in Saved Category"})
   })
});

router.get('/getall', async(request, response, next) => {
    let contact = await Contact.find();
    response.status(200).json(contact)
})


router.get('/getContact/:id', async function(request, response, next) {
    var id = request.params.id;
      await Contact.findById(id).then((res) => {
        if (!res) {
            response.status(400).json({ message: "Category Not found" });
        } else {
            response.status(200).json(res);
        }
    }).catch((err) => {
        console.log(err);
        response.status(400).json({ message: "Category Not found" });
    })
})

router.delete('/deleteContact/:id/:token', async function(request, response, next) {
    var id = request.params.id;
    var token = request.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isModerator) {
            await Contact.findByIdAndDelete(id).then((res) => {
                response.status(200).json(res);
            })
            .catch((err) => {
                console.log(err);
                response.status(400).json({ message: "Error in delete Category" });
            })
    } else {
        console.log(obj)
        response.status(400).json({ message: "This is not Moderator" });
    }

})

router.post('/search', async(request, response) => {
    var body = request.body;
    console.log("Body ");
    console.log(body);

    var thisname = body.name;
    console.log(thisname)

    await Contact.find({ "name": thisname }).then(all => {
        response.status(200).json(all);
    }).catch(err => {
        response.status(400).json({ message: "Error in search Phram" })
    })
})


module.exports = router;

