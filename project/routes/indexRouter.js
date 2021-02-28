var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html',{
        user_name: '',
        one_sentence: '',
        user_avatar: '../public/images/3.jpg',
        login: '登录'
    });
})

module.exports = router;