

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*"); //允许所有访问者跨域请求
    next();
})
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login_text = require('./routes/setText');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/setText',login_text);
app.use('/goData',function (req,res,next) {
    var getData=req.query;
    MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("config");
            dbo.collection("test").find({}).toArray(function (err, result) {
                if (err) throw err;
                for (var i = 0,len=result.length ;i <len; i++) {
                    if(result[i].userName==getData.userName&&result[i].password==getData.password){
                        return res.send('登陆成功');
                    }else{
                        return res.send('账号或密码错误');
                    }
                }
                db.close();
            });
        }
    );
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
