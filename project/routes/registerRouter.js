var express = require('express');
var router = express.Router();
var dbConfig = require('../util/db_config');

router.get('/', (req, res) => {
    res.render('register.html');
})

router.post('/', (req, res) => {
    let user_email = req.body.user_email;
    let user_name = req.body.user_name;
    let user_password = req.body.user_password;
    let confirm_password = req.body.confirm_password;
    let user_avatar = req.body.user_avatar;
    let one_sentence = req.body.one_sentence;
    if (user_password == confirm_password) {
        let sql = 'SELECT `user_email` FROM `user_db` WHERE `user_email` = ?';
        let sql_arr = [user_email];
        let callback = (err, data) => {
            if (err) {
                console.log('连接错误！');
            } else if (data == '') {
                let sql = 'INSERT INTO `user_db` (user_email, user_name, user_password, user_avatar, one_sentence) values(?, ?, ?, ?, ?)';
                let sql_arr = [user_email, user_name, user_password, user_avatar, one_sentence];
                let callback = (err, data) => {
                    if(err) {
                        console.log('连接错误！');
                        console.log(err);
                    }else {
                        console.log('注册成功！');
                        res.render('login.html');
                    }
                }

                dbConfig.sql_connect(sql, sql_arr, callback);
            }else{
                res.render('register.html', {
                    msg: '该邮箱已注册，请登录'
                })
            }
        }

        dbConfig.sql_connect(sql, sql_arr, callback);
    } else {
        res.render('register.html', {
            msg: '两次输入的密码不一致'
        })
    }
})

module.exports = router;