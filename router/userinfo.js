const express = require('express');
const router = express.Router();

const userinfo = require('../router_handler/userinfo')

router.get('/userinfo', userinfo.getUserInfo)

module.exports = router;