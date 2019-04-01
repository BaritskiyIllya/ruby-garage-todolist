tasksRepository = {
	edit_task: (req, resolver, task_id, { name, status, priority }) => {
		req.getConnection(function(err, connection) {

		const data = {
			name: name,
			status: status,
			priority: priority
		};

		Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : '');

		connection.query('UPDATE tasks SET ? WHERE id = ?', [data, task_id], function(err, rows) {
			if (err) {console.log(err); throw new Error};

			resolver({ ...data.name, id: rows.insertId });
			});
		});
	},

	view_tasks: (req) => {

		return new Promise((resolve, reject) => {
			req.getConnection((err, connection) => {
				connection.query('SELECT * FROM tasks ORDER BY priority', function(err, rows) {
				  if (err) reject(err);


				  resolve(rows);

				});
			});
		});
	},

	view_tasks_by_project: (req, resolver, id) => {

		req.getConnection(function(err, connection) {
			connection.query('SELECT * FROM tasks WHERE project_id = ?', [id], function(err, rows) {
			  if (err) throw new Error;

			  resolver(rows);
			});
		});
	},

	delete_task: (req, resolver, id) => {

		req.getConnection(function(err, connection) {
			connection.query('DELETE FROM tasks WHERE id = ?', [id], function(err, rows) {
				if (err) {console.log(err); throw new Error};

				resolver(rows);
			});
		});
	},

	get_priority: (req, id) => {

		return new Promise((resolve, reject) => {
			req.getConnection((err, connection) => {
				connection.query('SELECT * FROM tasks WHERE id = ?;', [id], function(err, rows) {
				  if (err) reject(err);

				  resolve(rows[0].priority);

				});
			});
		});
	},

	get_higher_priority: (req, priority, project_id) => {

		return new Promise((resolve, reject) => {
			req.getConnection((err, connection) => {
				connection.query('SELECT * FROM tasks WHERE priority > ? AND project_id = ?;', [priority, project_id], function(err, rows) {
				if (err) reject(err);

				resolve(rows);

				});
			});
		});
	},

	
	update_priority: (req, task_id, priority) => {

		return new Promise((resolve, reject) => {
			req.getConnection((err, connection) => {

				const data = {
				  priority: priority-1
				};

				console.log(data)

				connection.query('UPDATE tasks SET ? WHERE id = ?', [data, task_id], function(err, rows) {
				  if (err) reject(err);

				  console.log(rows)

				  resolve(rows);

				});
			});
		});
	},

	add_task: (req, resolver, { name, status, priority, deadline, project_id }) => {
		req.getConnection(function(err, connection) {
			const data = {
				name: name,
				status: status,
				priority: priority,
				deadline: deadline,
				project_id: project_id
			};

			connection.query('INSERT INTO tasks SET ?', [data], function(err, rows) {
				if (err) {console.log(err); throw new Error};

				resolver({ ...data.name, ...data.status, ...data.priority, ...data.deadline, ...data.project_id, id: rows.insertId });
			});
		});
	}
}

module.exports = tasksRepository;