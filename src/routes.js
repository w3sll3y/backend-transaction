const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const routes = express.Router();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'whitemaxtest'
})

const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if(!token) {
    return res.json("Sem token, por favor informe o token")
  } else {
    jwt.verify(token, "jwtSecretKey", (err, decoded) => {
      if(err) {
        res.status(401).json("Not Autenticated");
      } else {
        res.userId = decoded.id;
        next();
      }
    })
  }
}

routes.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const id = uuidv4();
  const sql = 'INSERT INTO `login` (`id`, `name`, `email`, `password`) VALUES (?, ?, ?, ?)';
  const values = [id, name, email, password];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json("Erro ao cadastrar");
    }
    return res.status(200).json(data);
  });
});


routes.post('/login', (req, res) => {
  const {email, password} = req.body;
  const sql = 'SELECT * FROM login WHERE `email` = ? AND `password` = ?'; 
  
  db.query(sql, [email, password], (err, data) => {
    if(err) {
      return res.status(404).json({message: 'Usuario nao encontrado'});
    }
    if(data?.length > 0 ) {
      const id = data[0].id;
      const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: '365d'});
      return res.status(200).json({Login: true, token, data});
    } else {
      return res.status(401).json("E-mail ou senha invalidos");
    };
  });
});

routes.post('/user', verifyJwt, (req, res) => {
  const {email} = req.body;
  const sql = 'SELECT  id, email, name FROM login WHERE `email` = ?'

  db.query(sql, email, (err, data) => {
    if(data) {
      return res.status(200).json(data)
    } else {
      return res.status(404).json({message: 'Usuario nao encontrado'})
    }
  });
});

routes.get('/transactions/:id', verifyJwt, (req, res) => {
  const {id} = req.params;
  const sql = 'SELECT id, value, createdAt, name FROM transactions WHERE createdBy = ?'
  db.query(sql, id, (err, data) => {
    if(data) {
      return res.status(200).json(data)
    } else {
      return res.status(404).json({message: "Erro ao processar"})
    }
  })
});

routes.post('/new-transaction', verifyJwt, (req, res) => {
  const sql = 'INSERT INTO transactions (`id`, `name`, `value`, `createdAt`, `createdBy`, `dueDate`,`validateCode`, `numberCard` ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  const id = uuidv4();
  const {name, numberCard, valueTransaction, dueDate, validateCode, createdAt, createdBy} = req.body;
  const values = [id, name, valueTransaction, createdAt, createdBy, dueDate, validateCode, numberCard ];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(404).json({message: "Erro ao processar"});
    }
    return res.status(200).json({message: "Transacao concluida com sucesso"});
  })
});

module.exports = routes;
