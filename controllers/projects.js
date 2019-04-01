const { validationResult } = require('express-validator/check');
const projectsRepository = require('../repositories/projects');
const tasksRepository = require('../repositories/tasks');

const projectsController = {
  add_project: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const params = req.body;
    const resolver = (created_project) => {
      res.status(201).json(created_project);
    };
    projectsRepository.add_project(req, resolver, { name: params.name })

  },

  edit_project: (req, res) => {
    const errors = validationResult(req);

    var project_id = req.params.id;

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const params = req.body;
    const resolver = (updated_project) => {
      res.status(201).json(updated_project);
    };
    projectsRepository.edit_project(req, resolver, project_id, { name: params.name })

  },

  index: async (req, res) => {
    const projects = await projectsRepository.view_projects(req);
    const tasks = await tasksRepository.view_tasks(req);

    const tasks_grouped_by_project = tasks.reduce(function(memo, task) {
      (memo[task['project_id']] = memo[task['project_id']] || []).push(task);
      return memo;
    }, {});

    const projects_with_tasks = projects.map((project) => {
      return tasks_grouped_by_project[project['id']] ? { ...project, tasks: tasks_grouped_by_project[project['id']]  } : project
    })

    res.status(200).json(projects_with_tasks);
  },

  delete_project: (req, res) => {

    var project_id = req.params.id;

    const resolver = (projects) => {
      res.status(200).json(projects);
    };
    projectsRepository.delete_project(req, resolver, project_id)
  }
  
}

module.exports = projectsController;