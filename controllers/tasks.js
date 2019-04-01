const { validationResult } = require('express-validator/check');
const tasksRepository = require('../repositories/tasks');

const tasksController = {
	edit_task: (req, res) => {
		const errors = validationResult(req);

		var project_id = req.params.id;
		var task_id = req.params.task_id;

		if (!errors.isEmpty()) {
		  return res.status(422).json({ errors: errors.array() });
		}

		const params = req.body;
		const resolver = (updated_tasks) => {
		  res.status(201).json(updated_tasks);
		};

		tasksRepository.edit_task(req, resolver, task_id, { name: params.name , status: params.status, priority: params.priority})

	},

	delete_task: async (req, res) => {

		var task_id = req.params.task_id;
		var project_id = req.params.id;

		const resolver = (tasks) => {
		  res.status(200).json(tasks);
		};

		const priority = await tasksRepository.get_priority(req, task_id);
		tasksRepository.delete_task(req, resolver, task_id);
		const tasksToUpdate = await tasksRepository.get_higher_priority(req, priority, project_id);
		tasksToUpdate.forEach((task) => {
		  tasksRepository.update_priority(req, task.id, task.priority);
		})
	},

	add_task: (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
		  return res.status(422).json({ errors: errors.array() });
		}

		const params = req.body;
		const resolver = (created_task) => {
		  res.status(201).json(created_task);
		};
		tasksRepository.add_task(req, resolver, { name: params.name, status: params.status, priority: params.priority, deadline: params.deadline, project_id: params.project_id })

	},

	view_tasks_by_project: (req, res) => {

		var project_id = req.params.id;

		const resolver = (tasks) => {
		  res.status(200).json(tasks);
		};

		tasksRepository.view_tasks_by_project(req, resolver, project_id)
	}
}

module.exports = tasksController;