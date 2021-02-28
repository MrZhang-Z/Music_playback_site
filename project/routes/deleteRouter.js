var express= require('express');
var router = express.Router();
var dbConfig = require('../util/db_config');

router.get('/', (req, res, next) => {
    let id = req.query.id;
    let sql = 'DELETE FROM `music_list_db` WHERE `id`=?';
    let sql_arr = [id];
    callback = (err, data) => {
        if(err) {
            console.log('删除失败！');
        }else{
            let sql = 'SELECT * FROM `music_list_db`';
            let sql_arr = [];
            let callback = (err, music_data) => {
                if(err) {
                    console.log('出错了'); 
                }else{ 
                    res.render('admin.html', {
                        music_data: music_data
                    })
                    console.log('删除成功！');
                }
            } 

            dbConfig.sql_connect(sql, sql_arr, callback);
        }
    }

    dbConfig.sql_connect(sql, sql_arr, callback);
})

module.exports = router;