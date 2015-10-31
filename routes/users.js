var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/filmList';

var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
      "time": (new Date()).getTime(),   // 看的时间, 如果为空则代表想要看.
      "name": "窃听风暴 Das Leben der Anderen (2006)",
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
  res.send('respond with a resource');
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
  });
});

module.exports = router;
