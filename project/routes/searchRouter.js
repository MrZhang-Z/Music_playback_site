var express = require('express');
var router = express.Router();
var dbConfig = require('../util/db_config');

router.get('/', (req, res) => {
    let search_content = req.query.search_content;
    let sql = 'SELECT * FROM `music_list_db` WHERE `music_name` like concat("%", ?, "%") or `music_singer` like concat("%", ?, "%")';
    let sql_arr = [search_content, search_content];
    let callback = (err, data) => {
        if(err) {
            console.log('搜索失败！',err);
        }else {
            // console.log(data);
            res.render('admin.html', {
                music_data : data
            });
        }
    }

    dbConfig.sql_connect(sql, sql_arr, callback);
})

module.exports = router;