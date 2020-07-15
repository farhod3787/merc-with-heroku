const express = require('express');
const SubCategory = require('../models/sub-categories');
const Admin = require('../models/admin');

const router = express.Router();

 //                                                               R e g i  s t r a t s i o n
router.post('/:token', async function (request, response, next) {
   var body = request.body;
    var token = request.params.token;
    var admins = await  Admin.find();
    console.log(body);
    var obj = await Admin.verifyOfAdmin(admins, token);

    let sub_category = {
        name_uz : body.name_uz,
        name_ru : body.name_ru,
        category_id: body.category_id
    }
    const sub_category_new = new SubCategory(sub_category);

    if(obj.isModerator) {
      sub_category_new.save().then( (res) =>{
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

    let sub_category = await SubCategory.find();

    response.status(200).json(sub_category)

    // var pharms = [];
    // Pharmacy.find().then( (all)=>{
    //     for(let i=all.length-1; i>=0; i--){
    //             pharms.push(all[i]);
    //     }
    //     response.status(200).json(pharms);
    // }).catch( (err) =>{
    //     console.log(err);
    //     response.status(400).json({message: "Error in Get Pharms"});
    // })
})

router.get('/getSelected/:id', async function(request, response, next) {
    var id = request.params.id;
    await SubCategory.find({"category_id": id}).then( (res) => {
      if(!res) {
        response.status(400).json({message: "Sub Categories Not founded"});
      } else {
        response.status(200).json(res);
      }

    })
})

router.get('/getSubCategory/:id', async function(request, response, next) {
    var id = request.params.id;
      await SubCategory.findById(id).then((res) => {
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
            await SubCategory.findByIdAndDelete(id).then((res) => {
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

router.patch('/updateSubCategory/:id/:token' , async function(request, response, next) {
    var id = request.params.id;
    var body = request.body;

    // body.logo = request.file.filename;

    var token = request.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isModerator) {
        await SubCategory.findByIdAndUpdate(id, { $set: body }, { new: true }).then((res) => {
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

    await SubCategory.find({ "name_uz": thisname_uz, "name_ru": thisname_ru }).then(all => {
        response.status(200).json(all);
    }).catch(err => {
        response.status(400).json({ message: "Error in search Phram" })
    })
})


module.exports = router;

