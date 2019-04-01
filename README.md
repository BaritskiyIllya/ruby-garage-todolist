# ruby-garage-todolist
test task for Ruby Garage Courses

link to heroku app: https://ruby-garage-todolist.herokuapp.com

## SQL task

### Database 

- todolist

### Tables

- projects (id, name)
- tasks (id, name, status, priority, deadline, project_id)

## Technical requirements

- get all statuses, not repeating, alphabetically ordered

``` 
SELECT DISTINCT tasks.status FROM tasks 
```

- get the count of all tasks in each project, order by tasks count descending

``` 
SELECT projects.name, COUNT(*) AS tasks_count FROM projects INNER JOIN tasks ON
projects.id = tasks.project_id GROUP BY projects.name ORDER BY tasks_count DESC 
```

- get the count of all tasks in each project, order by projects names

```
SELECT projects.name, COUNT(*) AS tasks_count FROM projects INNER JOIN tasks ON 
projects.id = tasks.project_id GROUP BY projects.name ORDER BY projects.name
```

- get the tasks for all projects having the name beginning with 'N' letter

```
SELECT tasks.name FROM tasks WHERE name LIKE 'N%'
```

- get the list of all projects containing the ‘a’ letter in the middle of the name, and show the tasks count near each project. Mention that there can exist projects without tasks and tasks with project_id=NULL

```
SELECT projects.name, COUNT(tasks.id) AS tasks_count FROM tasks RIGHT JOIN projects ON 
projects.id = tasks.project_id WHERE projects.name LIKE '%a%' GROUP BY projects.name
```

- get the list of tasks with duplicate names. Order alphabetically

```
SELECT tasks.name, tasks.id FROM tasks INNER JOIN (SELECT COUNT(tasks.id), tasks.name FROM tasks 
GROUP BY tasks.name HAVING COUNT(tasks.id) > 1 ) duplicate ON tasks.name = duplicate.name ORDER BY tasks.name
```

- get the list of tasks having several exact matches of both name and status, from the project 'Garage'. Order by matches count

```
SELECT tasks.name, COUNT(tasks.id) AS tasks_count FROM tasks INNER JOIN 
projects ON tasks.project_id = projects.id WHERE projects.name = 'Garage' 
GROUP BY tasks.name, tasks.status HAVING COUNT(tasks.id) >1 ORDER BY COUNT(tasks.id) ASC
```
- get the list of project names having more than 10 tasks in status 'completed'. Order by project_id

```
SELECT projects.name, COUNT(tasks.id) AS tasks_count FROM projects INNER JOIN tasks on projects.id = 
tasks.project_id WHERE tasks.status = 1 GROUP BY projects.id HAVING tasks_count > 10 ORDER BY projects.id
```
