const joi = require('joi')

const id = joi.number().integer().min(1).required()

const nickname= joi.string().min(1).max(12).required()
const email = joi.string().email().required()

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}