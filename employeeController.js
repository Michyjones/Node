function AllEmployees(req, res) {
  const { knex } = req.app.locals;
  knex
    .select('name', 'email', 'salary', 'department')
    .from('employess')
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
}

function SingleEmployees(req, res) {
  const { knex } = req.app.locals;
  const { id } = req.params;
  knex
    .select('name', 'email', 'salary', 'department')
    .from('employess')
    .where({ id: `${id}` })
    .then(data => {
      if (data.length > 0) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json(`No Employee with this ID ${id} !!`);
      }
    })
    .catch(error => res.status(500).json(error));
}
module.exports = {
  AllEmployees,
  SingleEmployees
};
