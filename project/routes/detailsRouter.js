var express = require('express');
var router = express.Router();
var dbConfig = require('../util/db_config');
var moment = require('moment');

router.get('/', (req, res) => {
    let music_name = req.query.music;
    let user_name = req.query.user_name;
    let sql = 'select * from `music_list_db` left join `comment_db` on music_list_db.music_name = comment_db.music_name where comment_db.music_name = ?';
    let sql_arr = [music_name];
    let callback = (err, data) => {
        if (err) {
            console.log('错误：' + err);
        } else {
            res.render('details.html', {
                music_data: data,
                user_name: user_name
            });
            // res.send(data)
        }
    }

    dbConfig.sql_connect(sql, sql_arr, callback);

})

router.post('/', (req, res) => {
    let music_name = req.body.music_name;
    let user = req.body.user_name;
    let sql = 'SELECT * FROM `user_db` WHERE `user_name` = ?';
    let sql_arr = [user];
    let callback = (err, data) => {
        let comment_content = req.body.comment_input;
        let user_avatar = data[0].user_avatar;
        let time = moment(Date.now()).format('YYYY-MM-DD');
        if (err) {
            console.log(err);
        } else {
            let sql = 'INSERT INTO `comment_db` (music_name, music_commentator, commentator_avatar, comment_content, comment_time) values(?, ?, ?, ?, ?)';
            let sql_arr = [music_name, user, user_avatar, comment_content, time]
            let callback = (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let sql = 'select * from `music_list_db` left join `comment_db` on music_list_db.music_name = comment_db.music_name where comment_db.music_name = ?';
                    let sql_arr = [music_name];
                    let callback = (err, data) => {
                        if (err) {
                            console.log('错误：' + err);
                        } else {
                            res.render('details.html', {
                                music_data: data,
                                user_name: user
                            });
                        }
                    }

                    dbConfig.sql_connect(sql, sql_arr, callback);
                }
            }

            dbConfig.sql_connect(sql, sql_arr, callback);
        }

    }

    dbConfig.sql_connect(sql, sql_arr, callback);
})

module.exports = router;