const express = require('express');
const Product = require('../models/products');
const News = require('../models/news');
const Admin = require('../models/admin')
const Config = require('../config/config');
const multer = require('multer');
var fs = require('fs');
const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Errorrr");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})
const upload = multer({ storage: storage })

const url = Config.url;



router.post('/create/:token', upload.single('image'), async (req, res) =>{
  var body = req.body;
  var token = req.params.token;
  var admin = await Admin.find();
  const file = req.file;
  var obj = Admin.verifyOfAdmin(admin, token);

  var news = {
      name_uz: body.name_uz,
      name_ru: body.name_ru,
      description_uz: body.description_uz,
      description_ru: body.description_ru,
      image_original_name : file.filename, // file.filename,    //image file
      rating: 1,
      date: new Date().toISOString().
                     replace(/T/, ' ').
                     replace(/\..+/, '')
  }
  var news_one = new News(news);

  if (obj.isModerator) {
      news_one.save().then(result => {
          res.status(200).json(true);
      }).catch(err => {
          console.log(err);
          res.status(400).json({ message: "Error in Saved Pharm" })
      })
  } else {
      res.status(400).json({ message: "This is not Moderator" });
  }
} );


router.get('/getall', async(request, response, next) => {
    var news = [];
    var prod = {}
    News.find().then( (all)=>{
        for(let i=all.length-1; i>=0; i--){
                prod = all[i];
                prod.image_original_name = url + '/images/' + all[i].image_original_name;
                news.push(prod);
        }
        response.status(200).json(news);
    }).catch( (err) =>{
        console.log(err);
        response.status(400).json({message: "Error in Get News"});
    })
})

router.get('/getLimit', async(request, response, next) => {
  var news = [];
  var prod = {}
  var q = 0 ;
  News.find().then( (all)=>{
      for(let i=all.length-1; i>=0; i--){
          q++;
              prod = all[i];
              prod.image_original_name = url + '/images/' + all[i].image_original_name;
              news.push(prod);
              if (q == 5) { break};
      }
      response.status(200).json(news);
  }).catch( (err) =>{
      console.log(err);
      response.status(400).json({message: "Error in Get News"});
  })
})

router.get('/getPopular', async(request, response, next) => {
  var news = [];
  var prod = {};
  var rating = [];
  var q = 0 ;
  News.find().then( (all)=>{
    for (let i = 0; i <= all.length - 1; i++) {
          rating[i] = all[i].rating;
    }
    rating.sort();
      for(let i=rating.length-1; i>=0; i--){
        // let z = 0;
        q++;
            News.find({rating: rating[i]}).then( res => {
              prod = res[0];
              prod.image_original_name = url + '/images/' + res[0].image_original_name;
              news[q] = prod;
              // console.log(news[q]);
              // console.log('AAAAAAAAAAS');

            }) ;
            if (q == 2) {
              break};
            // break;
      }
      console.log(news);
      response.status(200).json(news);
  }).catch( (err) =>{
      console.log(err);
      response.status(400).json({message: "Error in Get News"});
  })
})


router.get('/getNews/:id', async function(request, response, next) {
    var id = request.params.id;
    var prod = {}
      await News.findById(id).then((res) => {
        if (!res) {
            data.message = "Product Not found";
            response.status(400).json({ message: "Product Not found" });
        } else {
            prod = res;
            prod.image_original_name = url + '/images/'  + res.image_original_name
              response.status(200).json(prod);
        }
    }).catch((err) => {
        console.log(err);
        response.status(400).json({ message: "Product Not found" });
    })
})

router.delete('/:id/:token', async function(request, response, next) {
    var id = request.params.id;
    var token = request.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isModerator) {
            await News.findById(id).then( (res) =>{
               var image= res.image_original_name;
                fs.unlink('backend/images/' + image, function (err) {
                    if (err) {
                    console.log('File not deleted');}
                    else {
                        console.log('File deleted!');
                    }
                });
            });

            await News.findByIdAndDelete(id).then((res) => {
                response.status(200).json({ message: true });
            })
            .catch((err) => {
                console.log(err);
                response.status(400).json({ message: false });
            })
    } else {
        console.log(obj)
        response.status(400).json({ message: "This is not Moderator" });
    }

})

router.patch('/updateNews/:id/:token', multer({ storage: storage }).single('image'), async function(request, response, next) {
    var id = request.params.id;
    var token = request.params.token;
    var admin = await Admin.find();
    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isModerator) {
      await News.findById(id).then( (res) =>{
        var image= res.image_original_name;
         fs.unlink('backend/images/' + image, function (err) {
             if (err) {
             console.log(err.message);}
             else {
                 console.log('File deleted!');
             }
         });
     });
    var body = request.body;
    body.image_original_name = request.file.filename;
        await News.findByIdAndUpdate(id, { $set: body }, { new: true }).then((res) => {
            if (res) {
                response.status(200).json(true);
            } else {
                response.status(400).json(false)
            }
        }).catch(err => {
            console.log(err);
            response.status(400).json(false);
        })
    }
    else {
      response.status(400).json(false);
    }
})


// Miqdorini o'zgartirish


router.get('/updateRaiting/:id', async function(request, response) {
    var id = request.params.id;
    let body = {};
    var newRate;
    News.findById(id).then(res => {
        newRate = res.rating + 1;
        body.rating = newRate;
        News.findByIdAndUpdate(id, { $set: body }, { new: true }).then(res => {
            if (res) {
                response.status(200).json({ message: "Status: Success" })
            } else {
                response.status(400).json({ message: "Error in status" })
            }
        }).catch(err => {
            console.log(err);
            response.status(400).json(err);
        })
    })
})


router.post('/search', async(request, response) => {
    var body = request.body;
    var thisname_uz = body.name_uz;
    var thisname_ru = body.name_ru;

    await News.find({ "name_uz": thisname_uz, "name_ru": thisname_ru }).then(all => {
        response.status(200).json(all);
    }).catch(err => {
        response.status(400).json({ message: "Error in search Phram" })
    })
})


router.get('/getfile', function(req, res) {
    var body = req.body;
    res.json({ 'file': '/files' + body });
});


module.exports = router;
