const pg = require('pg');

const conString = "postgres://warshzea:R3yColCYNC6RjLLNUx3Ztrfwsfz7SN0N@baasu.db.elephantsql.com:5432/warshzea" //Can be found in the Details page
const client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
})

const getUsers = (req, res) => {
  client.query('select * from usersRec', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    res.status(200).json(result.rows)
    // client.end();
  });
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('SELECT * FROM usersRec WHERE id = $1', [id], (err, result) => {
    if (err) {
      return console.error('error', err);
    }
    res.status(200).json(result.rows);
  })
}

const createUser = (req, res) => {
  const { name, email } = req.body

  client.query('INSERT INTO usersRec (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      return console.error('couldn\'t create user', error.detail)
    }
    res.status(201).send(`User added!`)
  })
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  client.query(
    'UPDATE usersRec SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        return console.error('oops', error);
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('DELETE FROM usersRec WHERE id = $1', [id], (error, results) => {
    if (error) {
      return console.error('oops', error)
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
