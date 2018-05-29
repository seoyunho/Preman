const jwt = require('jsonwebtoken');
const Database = require('../../util/Database');
const secret = process.env.JWT_SECRET || 'default_key';

exports.createUser = (req, res) => {
  const { id, pwd, name } = req.body;
  const refreshToken = generateRefreshToken();
  let status = 500;

  Database.query('select * from user where id = ?', [id])
    .then(result => {
      if(result.length >= 1) {
        return res.status(409).end();
      }

      return Database.query('insert into user values (?, ?, ?, ?)', [id, pwd, name, refreshToken])
    })
    .then(result => {
      if(result.affectedRows !== 1)  {
        return res.status(500).end();
      }

      return res.status(201).end();
    })
    .catch(err => {
      return res.status(500).end();
    })
};

exports.signin = (req, res) => {
  const { id, pwd } = req.body;
  let response = { };
  let status = 500;
  let payload = { };
  const jwtOption = {
    algorithm : 'HS256',
    expiresIn : 60 * 60 * 24 * 7,
  }

  Database.query('select * from user where id = ? and pwd = ? ', [id, pwd])
    .then(async result => {
      if(result.length !== 1) {
        return res.status(204).end();
      }
      
      payload.id = id;
      response.refreshToken = result[0].refresh_token;

      response.token = await new Promise((resolve, reject) => {
        jwt.sign( payload, secret, jwtOption, (err, token) => {
          if (err) reject(err);
          resolve(token);
        })
      })

      return res.status(200).json(response);
    })
    .catch(err => {
      return res.status(500).end();
    })
};

function generateRefreshToken(){
  return new Date().getTime().toString() + Math.floor(Math.random()*1000000);
}