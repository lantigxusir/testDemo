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
        dbo.collection("test").find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            for (var i = 0,len=result.length ;i <len; i++) {
                if(result[i].userName==getObj.userName){
                    return res.send('此账号已使用');
                }else{
                    return res.send('success');
                }
            }
            db.close();
        });
    });

});

module.exports = router;
