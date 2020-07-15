const express = require('express');
const Category = require('../models/category');
const Admin = require('../models/admin');

const router = express.Router();

 //                                                               R e g i  s t r a t s i o n
router.post('/:token', async function (request, response, next) {
   var body = request.body;
    var token = request.params.token;
    var admins = await  Admin.find();
    console.log(body);
    var obj = await Admin.verifyOfAdmin(admins, token);

    let category = {
        name_uz : body.name_uz,
        name_ru : body.name_ru
    }
    const category_new = new Category(category);

    if(obj.isModerator) {
    category_new.save().then( (res) =>{
        response.status(200).json({message: "New category saved"})
    }).catch( err =>{
        console.log(err);
        response.status(404).json({message: "Error in Saved Category"})
    })
}
else {
    response.status(404).json({message: "This is not Moderator"})

}
});

router.get('/getall', async(request, response, next) => {
    let category = await Category.find();
    response.status(200).json(category)
})

router.get('/getCategory/:id', async function(request, response, next) {
    var id = request.params.id;
      await Category.findById(id).then((res) => {
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

router.delete('/:id/:token', async function(request, response, next) {
    var id = request.params.id;
    var token = request.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isModerator) {
            await Category.findByIdAndDelete(id).then((res) => {
                response.status(200).json({ message: "Category deleted!" });
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

router.patch('/updateCategory/:id/:token' , async function(request, response, next) {
    var id = request.params.id;
    var body = request.body;

    // body.logo = request.file.filename;

    var token = request.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isModerator) {
        await Category.findByIdAndUpdate(id, { $set: body }, { new: true }).then((res) => {
            if (res) {
                response.status(200).json({ message: "Category Update Successfully" });
            } else {
                response.status(400).json({ message: "Error in Update Category" })
            }
        }).catch(err => {
            console.log(err);
            response.status(400).json({ message: "This is Not Moderator" });
        })
    }
})



router.post('/search', async(request, response) => {
    var body = request.body;
    console.log("Body ");
    console.log(body);

    var thisname_uz = body.name_uz;
    var thisname_ru = body.name_ru;
    console.log(thisname)

    await Category.find({ "name_uz": thisname_uz, "name_ru": thisname_ru }).then(all => {
        response.status(200).json(all);
    }).catch(err => {
        response.status(400).json({ message: "Error in search Phram" })
    })
})


module.exports = router;

