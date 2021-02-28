var express = require('express');
var router = express.Router();
var dbConfig = require('../util/db_config');

router.get('/', (req, res) => {
    res.render('add.html');
})

router.post('/', (req, res) => {
    let musicName = req.body.music_name;
    let musicSinger = req.body.music_singer;
    let musicAlbum = req.body.music_album;
    let musicSrc = req.body.music_src;
    let musicImg = req.body.music_img;
    let sql = 'insert into `music_list_db`(music_name,music_singer,music_album,music_src,music_img) values(?,?,?,?,?)';
    let sql_arr = [musicName, musicSinger, musicAlbum, musicSrc, musicImg];
    let callback = (err, data) => {
        if(err) {
            console.log('添加失败！');
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