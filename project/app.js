
var express = require('express');

var indexRouter = require('./routes/indexRouter');
var getMusicList = require('./routes/musicList');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/loginRouter');
var adminRouter = require('./routes/adminRouter');
var addRouter = require('./routes/addRouter');
var deleteRouter = require('./routes/deleteRouter');
var editRouter = require('./routes/editRouter');
var searchRouter = require('./routes/searchRouter');
var registerRouter = require('./routes/registerRouter');
var detailsRouter = require('./routes/detailsRouter');

var app = express();

// 配置art-template 模版引擎
app.engine('html', require('express-art-template'));

// 配置静态资源
app.use('/public/',express.static('./public/'));

// 引入body-parser
const bodyParser = require('body-parser');
//对body-parser 进行配置
app.use( bodyParser.urlencoded({extended: true}) )

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/musicList', getMusicList);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/add', addRouter);
app.use('/delete', deleteRouter);
app.use('/edit', editRouter);
app.use('/search', searchRouter);
app.use('/register', registerRouter);
app.use('/details', detailsRouter);

app.listen(3000, () => {
  console.log('服务已启动，请访问3000端口。');
})
