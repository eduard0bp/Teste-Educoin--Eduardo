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
  const { email, password, type, school, name, surname } = req.body

  db.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email, password, type, school, name, surname],
    (err, result) => {
      if (err) {
        res.send(err)
      }
      if (result.length === 0) {
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
  const { email, password, school } = req.body

  db.query(
    'SELECT id, type, name, email FROM usuarios WHERE email = ? AND password = ? AND school = ?',
    [email, password, school],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: 'Erro no servidor!' })
        return
      }
      if (result.length > 0) {
        const user = result[0]
        res.send({
          message: 'Usuário logado com sucesso!',
          user: {
            id: user.id,
            type: user.type,
            name: user.name,
            email: user.email
          }
        })
      } else {
        res.status(401).send({ message: 'Usuário ou senha inválidos!' })
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

app.get('/users/:id', (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Erro ao buscar usuário!' })
    } else if (result.length > 0) {
      res.send(result[0])
    } else {
      res.status(404).send({ message: 'Usuário não encontrado!' })
    }
  })
})

app.listen(3001, () => console.log('Server running on port 3001'))
