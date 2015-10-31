var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/filmList';

var insertDocument = function(db, time, name, starA, starB, link, image, callback) {
   db.collection('restaurants').insertOne( {
      "time": time,   // 看的时间, 如果为空则代表想要看.
      "name": name,
      "starA": 5,
      "startB": 4,
      "url": "http://movie.douban.com/subject/1900841/",
      "image": "http://img4.douban.com/view/photo/photo/public/p1808851998.jpg"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('{"err": "method not supported."}');
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  var time = (new Date()).getTime();
  var name = "窃听风暴";
  var starA = 5;
  var starB = 4;
  var link = "http://movie.douban.com/subject/1900841/";
  var image = "http://img4.douban.com/view/photo/photo/public/p1808851998.jpg";
  
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, time, name, starA, starB, link, image, function() {
        db.close();
        var retmsg = '{"msg": "insert ' + name + ' success!"}';
        res.send(retmsg);
    });
  });
});

module.exports = router;
