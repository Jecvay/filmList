var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/filmList';

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
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('watched');
  collection.find({}, {}, function(e, docs) {
    res.json(docs);
  });
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  // var time = (new Date()).getTime();
  // var name = "窃听风暴";
  // var starA = 5;
  // var starB = 4;
  // var link = "http://movie.douban.com/subject/1900841/";
  // var image = "http://img4.douban.com/view/photo/photo/public/p1808851998.jpg";
  
  var db = req.db;
  var collection = db.get('watched');
  var body = req.body
  var para = req.params;
  console.dir(body);
  console.log("haha:" + para + para.name);
  console.log(body.name);
  res.send("ok");
  
  
  // MongoClient.connect(url, function(err, db) {
  //   assert.equal(null, err);
  //   insertDocument(db, time, name, starA, starB, link, image, function() {
  //       db.close();
  //       var retmsg = '{"msg": "insert ' + name + ' success!"}';
  //       res.send(retmsg);
  //   });
  // });
});

module.exports = router;
