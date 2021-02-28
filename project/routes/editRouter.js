var express = require('express');
var router = express.Router();
var dbConfig = require('../util/db_config');

router.get('/', (req, res) => {
    let id = req.query.id;
    let sql = 'SELECT * FROM `music_list_db` WHERE `id`=?';
    let sql_arr = [id];
    let callback = (err, data) => {
        if(err) {
            console.log('修改失败！');
        }else {
            res.render('edit.html', {
                music_info: data[0]
            })
        }
    }

    dbConfig.sql_connect(sql, sql_arr, callback);
});

router.post('/', (req, res) => {
    let id = req.body.music_id;
    let music_name = req.body.music_name;
    let music_singer = req.body.music_singer;
    let music_album = req.body.music_album;
    let music_src = req.body.music_src;
    let music_img = req.body.music_img;
    let sql = 'UPDATE `music_list_db` set `music_name`=?,`music_singer`=?,`music_album`=?,`music_src`=?,`music_img`=? where `id` = ?';
    let sql_arr = [music_name, music_singer, music_album, music_src, music_img, id];
    let callback = (err, data) => {
        if(err) {
            console.log('修改失败！');
            console.log(err);

        }else {
            let sql = 'SELECT * FROM `music_list_db`';
            let sql_arr = [];
            let callback = (err, music_data) => {
                if(err) {
                    console.log('出错了');
                }else{
                    res.render('admin.html', {
                        music_data: music_data
                    })
                }
            }

            dbConfig.sql_connect(sql, sql_arr, callback);
        }
    }

    dbConfig.sql_connect(sql, sql_arr, callback);
})

module.exports = router;