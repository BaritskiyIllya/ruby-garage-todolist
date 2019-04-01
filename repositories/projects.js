projectsRepository = {

  view_projects: (req) => {
    return new Promise((resolve, reject) => {
      req.getConnection((err, connection) => {
        connection.query('SELECT * FROM projects', function(err, rows) {
          if (err) reject(err);

          resolve(rows);
        });
      });
    });
  },

  add_project: (req, resolver, { name }) => {
    req.getConnection(function(err, connection) {
      const data = {
        name: name,
      };

      connection.query('INSERT INTO projects SET ?', [data], function(err, rows) {
        if (err) throw new Error;

        resolver({ ...data.name, id: rows.insertId });
      });
    });
  },

  edit_project: (req, resolver, id, { name }) => {
    req.getConnection(function(err, connection) {
      const data = {
        name: name,
      };

      connection.query('UPDATE projects SET ? WHERE id = ?', [data, id], function(err, rows) {
        if (err) throw new Error;

        resolver({ ...data.name, id: rows.insertId });
      });
    });
  },

  delete_project: (req, resolver, id) => {

    req.getConnection(function(err, connection) {
      connection.query('DELETE FROM projects WHERE id = ?', [id], function(err, rows) {
        if (err) {console.log(err); throw new Error};

        resolver(rows);
      });
    });
  }
}

module.exports = projectsRepository;