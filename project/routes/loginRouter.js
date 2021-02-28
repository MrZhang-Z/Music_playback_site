
var express = require('express');
var router = express.Router();
var dbConfig = require('../util/db_config')

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login.html')
});

router.post('/', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let identity = req.body.identity;
  if (identity == 1) {
    let sql = 'SELECT * FROM `user_db` WHERE `user_email` = ? and `user_password` = ?';
    let sql_arr = [email, password];
    let callback = (err, data) => {
      if (err) {
        console.log('连接错误！');
        console.log(err);
        res.render('login.html')
      }else if(data == '') {
        res.render('login.html', {
          msg: '无此用户'
        })
      } else {
        res.render('index.html', {
          user_name: data[0].user_name,
          one_sentence: data[0].one_sentence,
          user_avatar: data[0].user_avatar,
          login: '注销'
        })
      }
    }

    dbConfig.sql_connect(sql, sql_arr, callback);
  } else if (identity == 0) {
    let sql = 'SELECT * FROM `administrator_db` WHERE `user_email` = ? and `user_password` = ?';
    let sql_arr = [email, password];
    let callback = (err, data) => {
      if (err) {
        console.log('连接错误！');
      }else if(data == '') {
        res.render('login.html', {
          msg: '无此管理员'
        })
      } else {
        let sql = 'SELECT * FROM `music_list_db`';
        let sql_arr = [];
        let callback = (err, music_data) => {
          if (err) {
            console.log('出错了');
          } else {
            res.render('admin.html', {
              music_data: music_data,
              login: '注销'
            })
          }
        }

        dbConfig.sql_connect(sql, sql_arr, callback);
      }
    }

    dbConfig.sql_connect(sql, sql_arr, callback);
  }
})

module.exports = router;
