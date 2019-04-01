const router = require('express').Router();
const projectsController = require('../controllers/projects');
const tasksController = require('../controllers/tasks');
const createProjectValidator = require('../validators/projects');
const createTaskValidator = require('../validators/projects');
const updateTaskValidator = require('../validators/projects');


router.get('/api/projects', projectsController.index);
router.post('/api/projects', createProjectValidator, projectsController.add_project);
router.put('/api/projects/:id', createProjectValidator, projectsController.edit_project);
router.delete('/api/projects/:id', projectsController.delete_project);

router.get('/api/projects/:id', tasksController.view_tasks_by_project);
router.post('/api/projects/:id', createTaskValidator, tasksController.add_task);
router.put('/api/projects/:id/tasks/:task_id', tasksController.edit_task);
router.delete('/api/projects/:id/tasks/:task_id', tasksController.delete_task);

router.get('*', (req, res) => {
	res.sendfile('./public/index.html')
} );

module.exports = router;
