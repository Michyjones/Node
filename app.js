const express = require('express');
const app = express();
const port = 3000;
const settings = require('./settings');
const mysql = require('mysql');
 
const routes = require('./routes');

const connection = mysql.createConnection(settings.database);

const router = express.Router();

router.get('/employees', routes.employees.AllEmployees);
// router.get('/employee/:id', (req, res) => {
//   const id = +req.params.id;
//   const employee = data.filter(d => d.id === id);
//   return res.send(employee);
// });
app.use('/api', router);

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return process.exit();
  }
  app.locals.connection = connection;
  app.listen(settings.APIServerPort, () =>
    console.info(`Server listening on ${settings.APIServerPort}.`)
  );
});
