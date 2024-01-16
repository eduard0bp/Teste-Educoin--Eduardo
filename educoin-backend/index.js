const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'banco'
})

app.use(express.json())
app.use(cors())

app.post('/register', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const type = req.body.type
  const school = req.body.school
  const name = req.body.name
  const surname = req.body.surname

  db.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email, password],
    (err, result) => {
      if (err) {
        res.send(err)
      }
      if (result.length > 0) {
        db.query(
          'INSERT INTO usuarios (email, password, type, school, name, surname) VALUES (?, ?, ?, ?, ?, ?)',
          [email, password, type, school, name, surname],
          (err, result) => {
            if (err) {
              res.send(err)
            }
            res.send({ message: 'Usuário criado com sucesso!' })
          }
        )
      } else {
        res.send({ message: 'Usuário ja cadastrado!' })
      }
    }
  )
})

app.post('/login', (req, res) => {
  const { email, password } = req.body

  db.query(
    'SELECT * FROM usuarios WHERE email = ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) {
        res.send(err)
      }
      if (result.length > 0) {
        res.send({ message: 'Usuário logado com sucesso!' })
      } else {
        res.send({ message: 'Usuário ou senha inválidos!' })
      }
    }
  )
})

app.get('/users', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
})

app.delete('/users/:id', (req, res) => {
  const id = req.params.id

  db.query('DELETE FROM usuarios WHERE id = ?', id, (err, result) => {
    if (err) {
      res.send({ message: 'Erro ao deletar usuário!' })
    }
    res.send({
      message: 'Usuário deletado com sucesso!'
    })
  })
})

app.put('/users/:id', (req, res) => {
  const id = req.params.id
  const { email, password, type, school, name, surname } = req.body

  db.query(
    'UPDATE usuarios SET email = ?, password = ?, type = ?, school = ?, name = ?, surname = ? WHERE id = ?',
    [email, password, type, school, name, surname, id],
    (err, result) => {
      if (err) {
        res.send({ message: 'Erro ao atualizar usuário!' })
      }
      res.send({
        message: 'Usuário atualizado com sucesso!'
      })
    }
  )
})

app.listen(3001, () => console.log('Server running on port 3001'))
