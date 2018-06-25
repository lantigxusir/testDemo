var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
/* GET users listing. */
router.get('/', function(req, res, next) {
    var getObj=req.query;
    console.log(getObj)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("config");
        if(getObj!={}){
            dbo.collection("test").insertOne(getObj,function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                res.send(result);
                db.close();
            });
        }
    });

});

module.exports = router;
