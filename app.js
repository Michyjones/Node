const express = require('express');
const app = express();
const port = 3000;
const settings = require('./settings');
const middlewares = require('./middlewares');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const knex = require('knex')({
  client: 'mysql',
  connection: settings.database

});

app.locals.knex = knex;
const routes = require('./routes');

const router = express.Router();

router.get('/employees', routes.employees.AllEmployees);
router.get('/employees/:id', middlewares.getIDAsInt, routes.employees.SingleEmployees);
router.post('/employees', jsonParser ,routes.employees.CreateEmployees);
router.patch('/employees/:id', jsonParser, middlewares.getIDAsInt, routes.employees.UpdateEmployees);
router.delete('/employees/:id', middlewares.getIDAsInt, routes.employees.DeleteEmployees);


router.get('/department', routes.departments.AllDepartment);
router.get('/department/:id', middlewares.getIDAsInt, routes.departments.SingleDepartment);
router.post('/department', jsonParser ,routes.departments.CreatedeDartments);
router.patch('/department/:id', jsonParser, middlewares.getIDAsInt, routes.departments.UpdateDepartments);
router.delete('/department/:id', middlewares.getIDAsInt, routes.departments.DeleteDepartments);

app.use('/api', router);


app.listen(settings.APIServerPort, () =>
  console.info(`Server listening on ${settings.APIServerPort}.`)
);
