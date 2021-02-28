var express = require('express');
var router = express.Router();
var dbConfig = require('../util/db_config');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM `music_list_db`';
    let sql_arr = [];
    let callback = (err, data) => {
        res.send(data);
    }

    dbConfig.sql_connect(sql, sql_arr, callback);
})

module.exports = router;