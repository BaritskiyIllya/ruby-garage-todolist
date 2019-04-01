import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

export interface Project {
	id: number,
	name: string
}

export interface Task {
  id: number,
  name: string,
  status: string,
  priority: number,
  deadline: string,
  project_id: number
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	private url: string = "/api/projects"; 

	public projects: Project[] = [];

  public tasks: Task[] = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private httpClient: HttpClient) { }

  ngOnInit() {
  	this.getProjects();
    console.log(window.location.origin);
  }

  getProjects() {
    this.httpClient
    .get<Project[]>(this.url).subscribe((response) => {
      this.projects = response;
    });
  }

  onDeleteProject(id) {
    this.httpClient.delete(`${this.url}/${id}`)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  onDeleteTask(project_id, task_id) {    
    this.httpClient.delete(`${this.url}/${project_id}/tasks/${task_id}`)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  onAddTask(name: string, deadline: string, project_id, tasks, alertAddTask) {
    var priority = 0;
    if (tasks !== undefined) {
      Math.max.apply(Math, tasks.map(function(o) 
      { 
        priority = o.priority + 1;
        return o.priority; 
      }));
    };

    if (deadline !== "" && name !== "") {
      this.httpClient.post<Task>(`${this.url}/${project_id}`, {
          name: name,
          status: 0,
          priority: priority,
          deadline: deadline,
          project_id: project_id
        }).subscribe(task => {
          this.tasks.push(task);
          this.ngOnInit();
        });
      } else 
      alertAddTask.innerHTML = "please enter name and deadline";

  }

  onEditProject(name: string, project_id, editProject) {
    if (name !== "") {
      this.httpClient.put<Project>(`${this.url}/${project_id}`, {
        name: name
      }).subscribe(project => {
        this.ngOnInit();
      })
    } else 
      editProject.placeholder = "project name should be at least 1 char long";
  }

  onEditTask(name: string, project_id, task_id, editTask) {
    if (name !== "") {
      this.httpClient.put<Task>(`${this.url}/${project_id}/tasks/${task_id}`, {
        name: name
      }).subscribe(task => {
        this.ngOnInit();
      })
    } else 
      editTask.placeholder = "task name should be at least 1 char long";
    
  }

  onChecked(checkBox, project_id, task_id) {
    if (checkBox.checked === true) {
      this.httpClient.put<Task>(`${this.url}/${project_id}/tasks/${task_id}`, {
        status: 1
      }).subscribe(task => {

      })
    } else {
      this.httpClient.put<Task>(`${this.url}/${project_id}/tasks/${task_id}`, {
        status: 0
      }).subscribe(task => {

      })
    }
  }

  drop(event: CdkDragDrop<Task[]>, project_id) {

    const list = event.container.data;

    let firstTaskId;
    let secondTaskId;
    let firstTaskPriority;
    let secondTaskPriority;

    list.forEach((task) => {

      if (task.priority === event.previousIndex) {
        firstTaskId = task.id;
        firstTaskPriority = task.priority
      }

      if (task.priority === event.currentIndex) {
        secondTaskId = task.id;
        secondTaskPriority = task.priority;
      }

    })

    this.httpClient.put<Task>(`${this.url}/${project_id}/tasks/${firstTaskId}`, {
      priority: secondTaskPriority
    }).subscribe(task => {
      this.ngOnInit();
    })

    this.httpClient.put<Task>(`${this.url}/${project_id}/tasks/${secondTaskId}`, {
      priority: firstTaskPriority
    }).subscribe(task => {
      this.ngOnInit();
    })
  }
}
