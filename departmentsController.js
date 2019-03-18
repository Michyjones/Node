function AllDepartment(req, res) {
    const { knex } = req.app.locals;
    knex
      .select('name')
      .from('departments')
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json(error));
  }
  
  function SingleDepartment(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    knex
      .select('name')
      .from('departments')
      .where({ id: `${id}` })
      .then(data => {
        if (data.length > 0) {
          return res.status(200).json(data);
        } else {
          return res.status(404).json(`No department with  ID ${id} !!`);
        }
      })
      .catch(error => res.status(500).json(error));
  }
  
  function CreatedeDartments(req, res) {
    const { knex } = req.app.locals;
    const payload = req.body;
    requiredColumns = ['name'];
    payloadKeys = Object.keys(payload);
    requiredColumnsExists = requiredColumns.every(rc => payloadKeys.includes(rc));
    if (requiredColumnsExists) {
      knex('departments')
        .insert(payload)
        .then(response => res.status(200).json('Department created successfully'))
        .catch(error => res.status(500).json(error));
    } else {
      return res
        .status(400)
        .json(`Fill in the required fields ${requiredColumns}`);
    }
  }
  
  function UpdateDepartments(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    const payload = req.body;
    knex('departments')
      .where('id', id)
      .update(payload)
      .then(response => {
        if (response) {
          return res
            .status(200)
            .json(`You have successfully updated department with ID ${id}`);
        }
        return res.status(404).json(`No department with ID ${id}`);
      })
  
      .catch(error => res.status(500).json(error));
  }
  
  function DeleteDepartments(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    knex('departments')
      .where('id', id)
      .del()
      .then(response => {
        if (response) {
          return res
            .status(200)
            .json(`You have successfully deleted department with ID ${id}`);
        }
        return res.status(404).json(`No department with ID ${id}`);
      })
      .catch(error => res.status(500).json(error));
  }
  
  module.exports = {
    AllDepartment,
    SingleDepartment,
    CreatedeDartments,
    UpdateDepartments,
    DeleteDepartments
  };
  