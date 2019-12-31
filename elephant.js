var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://warshzea:R3yColCYNC6RjLLNUx3Ztrfwsfz7SN0N@baasu.db.elephantsql.com:5432/warshzea" //Can be found in the Details page
var client = new pg.Client(conString);
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
    res.status(200).json(result.rows[0])
    client.end();
  });
}

// const getUserById = (req, res) => {
//   const id = parseInt(req.params.id)

//   pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(200).json(results.rows)
//   })
// }

// const createUser = (req, res) => {
//   const { name, email } = req.body

//   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(201).send(`User added with ID: ${results.insertId}`)
//   })
// }

// const updateUser = (req, res) => {
//   const id = parseInt(req.params.id)
//   const { name, email } = req.body

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       res.status(200).send(`User modified with ID: ${id}`)
//     }
//   )
// }

// const deleteUser = (req, res) => {
//   const id = parseInt(req.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(200).send(`User deleted with ID: ${id}`)
//   })
// }

module.exports = {
  getUsers,
  // getUserById,
  // createUser,
  // updateUser,
  // deleteUser,
}
