// 引入express 模块
var express = require('express');
// 引入用户路由
var loginRouter = require('./routes/loginRouter');
// 引入用户注册路由
var registerRouter = require('./routes/registerRouter');

var app = express();

// 使用用户登录路由
app.use('/login', loginRouter);
// 使用用户注册路由
app.use('/register', registerRouter);

// 监听3000 端口
app.listen(3000, () => {
    console.log('服务已启动，请访问3000端口。');
})