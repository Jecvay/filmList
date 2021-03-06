var express = require('express');
var router = express.Router();
var assert = require('assert');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jecvay FilmList' , haha: "Niubi"});
});

// 查询电影列表
var queryDocument = function(db, res, callback) {
  var cursor = db.collection('watched').find();
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      res.send(doc);
      console.dir(doc);
    } else {
      console.log("nothing found.");
      callback();
    }
  });
};

// 插入电影
var insertDocument = function(db, time, name, starA, starB, link, image, callback) {
   db.collection('watched').insertOne( {
      "time": time,   // 看的时间, 如果为空则代表想要看.
      "name": name,
      "starA": 5,
      "startB": 4,
      "url": "http://movie.douban.com/subject/1900841/",
      "image": "http://img4.douban.com/view/photo/photo/public/p1808851998.jpg"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the watched collection.");
    callback(result);
  });
};

/* GET users listing. */
router.get('/api/watchedlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('watched');
  collection.find({}, {}, function(e, docs) {
    res.json(docs);
  });
});

/* POST users listing. */
router.post('/api/watchedlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('watched');
  var body = req.body
  var errmsg;
  
  var time = (new Date()).getTime();
  var name = body.name;
  var starA = body.starA;
  var starB = body.starB;
  var link = body.link;
  var image = body.image;
  
  if (body.time) {
    time = body.time;
  }
  
  if (!name) errmsg = "need name";
  if (!starA) errmsg = "need starA";
  if (!starB) errmsg = "need starB";
  if (!link) errmsg = "need link";
  if (!image) errmsg = "need image";
  
  if (errmsg) {
    res.send('{"err": '+ errmsg +'}')
    console.log(errmsg);
  } else {
    // 插入数据库
    collection.insert({
      "time": time,
      "name": name,
      "starA": starA,
      "starB": starB,
      "link": link,
      "image": image
    }, function(err, doc) {
      if (err) {
        res.send('{"err": "Something wrong when writing into mongodb."}');
      } else {
        res.send('{"msg": "insert '+ name + ' ok"}');
      }
    });
  }
});


module.exports = router;