const mysql = require('mysql');

module.exports = {
    // 配置数据库
    config: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'music_player_database'
    },

    // 使用mysql 连接池连接数据库
    sql_connect: function (sql, sql_arr, callback) {
        var pool = mysql.createPool(this.config);
        pool.getConnection((err, con) => {
            if (err) {
                console.log('连接失败');
                return;
            }
            // 事件驱动回调
            con.query(sql, sql_arr, callback);
            // 释放链接
            con.release();
        })
    }
}
