import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from '../tasks/tasks.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  @Output() getProjects: EventEmitter<any> = new EventEmitter<any>();

	private url: string = "/api/projects";

	public projects: Project[] = [];

  constructor(
  	private httpClient: HttpClient, 
  	private router: Router) { }

  ngOnInit() {
  }

  onAddProject() {
    console.log(this.url)
  	this.httpClient.post<Project>(this.url, {
  		name: "new TODO list"
  	}).subscribe(project => {
  		this.projects.push(project);
      this.getProjects.emit();
  	})
  }

}
