const express = require('express');
const router = express.Router();

const expressJoi = require('@escook/express-joi');


const userinfo = require('../router_handler/userinfo')
const { update_userinfo_schema } = require('../schema/userinfo')

router.get('/userinfo', userinfo.getUserInfo)
router.post('/userinfo', expressJoi(update_userinfo_schema, { presence: 'required' }), userinfo.updateUserInfo)

module.exports = router;