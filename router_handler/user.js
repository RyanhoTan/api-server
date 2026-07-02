const db = require('../db/index');
const bcrypt = require('bcryptjs');

exports.reguser = (req, res) => {
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码不合法');
    }
    const sql = 'select * from ev_users where username=?';
    db.query(sql, userinfo.username, (err, results) => {
        if (err) {
            
            return res.cc(err.message);
       }
       
            if (results.length > 0)  {
                return res.cc('用户名被占用，请更换其他用户名');
            }
        // TODO: 用户名可用，继续后续流程
        // 原密码
        console.log(userinfo.password);
      userinfo.password =   bcrypt.hashSync(userinfo.password, 10);
    //   加密后的密码
      console.log(userinfo.password);


      const sql = 'insert into ev_users set ?';


      db.query(sql, {username: userinfo.username, password: userinfo.password}, (err, results) => {
        if (err) {
            return res.cc(err.message);
        }
        if (results.affectedRows !== 1) {
            return res.cc('注册用户失败，请稍后再试');
      } })

        res.cc('注册成功',  0);
    })

    
}

exports.login = (req, res) => {
    res.send('login ok');
}
