const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const db = require('./queries');
const eSql = require('./elephant');
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', eSql.getUsers)
app.get('/users/:id', eSql.getUserById)
app.post('/users', eSql.createUser)
app.put('/users/:id', eSql.updateUser)
app.delete('/users/:id', eSql.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
