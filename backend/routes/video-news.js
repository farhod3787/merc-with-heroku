const express = require('express');
const Product = require('../models/products');
const Video_news = require('../models/video-news');
const Admin = require('../models/admin')
const router = express.Router();

router.post('/create/:token', async (req, res) =>{
  var body = req.body;
  var token = req.params.token;
  var admin = await Admin.find();
  var obj = Admin.verifyOfAdmin(admin, token);

  var news = {
      url: body.url,
      date: new Date().toISOString().
                     replace(/T/, ' ').
                     replace(/\..+/, '')
  }
  var news_one = new Video_news(news);

  if (obj.isModerator) {
      news_one.save().then(result => {
          res.status(200).json(true);
      }).catch(err => {
          console.log(err);
          res.status(400).json({ message: "Error in Saved News" })
      })
  } else {
      res.status(400).json({ message: "This is not Moderator" });
  }
} );


router.get('/getall', async(request, response, next) => {
  var news = [];
  var prod = {}
  var q = 0 ;
    Video_news.find().then( (all)=>{
      for(let i=all.length-1; i>=0; i--){
        q++;
        prod = all[i];
        prod.url = 'https://www.youtube.com/embed/' + all[i].url;
        news.push(prod);
}
        response.status(200).json(news);
    }).catch( (err) =>{
        response.status(400).json({message: "Error in Get News"});
    })
})

router.get('/getLimit', async(request, response, next) => {
  var news = [];
  var prod = {}
  var q = 0 ;
  Video_news.find().then( (all)=>{
      for(let i=all.length-1; i>=0; i--){
              q++;
              prod = all[i];
              prod.url = 'https://www.youtube.com/embed/' + all[i].url;
              news.push(prod);
              if (q == 9) { break};
      }
      response.status(200).json(news);
  }).catch( (err) =>{
      console.log(err);
      response.status(400).json({message: "Error in Get News"});
  })
})


router.delete('/:id/:token', async function(request, response, next) {
    var id = request.params.id;
    var token = request.params.token;
    var admin = await Admin.find();

    var obj = Admin.verifyOfAdmin(admin, token);
    if (obj.isModerator) {
            await Video_news.findByIdAndDelete(id).then((res) => {
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

module.exports = router;
