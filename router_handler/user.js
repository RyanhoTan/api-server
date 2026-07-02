const db = require('../db/index');

exports.reguser = (req, res) => {
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不合法' });
    }
    const sql = 'select * from ev_users where username=?';
    db.query(sql, userinfo.username, (err, results) => {
        if (err) {
            
            return res.send({ status: 1, message: err.message });
       }
       
            if (results.length > 0)  {
                return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' });
            }
        // TODO: 用户名可用，继续后续流程
        res.send('reguser ok');
    })

    
}

exports.login = (req, res) => {
    res.send('login ok');
}
