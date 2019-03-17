function AllEmployees(req, res) {
  const connection = req.app.locals.connection;
  connection.query(
    'SELECT e.id, e.name, e.email, e.salary, d.name as "Department" FROM employess e JOIN departments d On e.department = d.id',
    (error, results) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(results);
    }
  );
}
module.exports = {
  AllEmployees
};
