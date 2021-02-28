var express = require('express');
var router = express.Router();
var dbConfig = require('../util/db_config')


// router.post('/', (req, res) => {
//     let email = req.body.email;
//     let password = req.body.password;
//     let sql = 'SELECT * FROM `administrator_db` WHERE `user_email` = ? and `user_password` = ?';
//     let sql_arr = [email, password];
//     let callback = (err, user_data) => {
//         if (err) {
//             console.log('连接错误。');
//         } else if (user_data == '') {
//             res.render('login.html', {
//                 msg: '邮箱或密码错误！'
//             })
//         } else {
//             let sql = 'SELECT * FROM `music_list_db`';
//             let sql_arr = [];
//             let callback = (err, music_data) => {
//                 if(err) {
//                     console.log('出错了');
//                 }else{
//                     res.render('admin.html', {
//                         music_data: music_data
//                     })
//                 }
//             }

//             dbConfig.sql_connect(sql, sql_arr, callback);
//         }
//     }

//     dbConfig.sql_connect(sql, sql_arr, callback);
// });

module.exports = router;