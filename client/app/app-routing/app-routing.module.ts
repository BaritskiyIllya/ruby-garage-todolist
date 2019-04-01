import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from '../tasks/tasks.component';

const routes: Routes = [
{
	path: '', 
	redirectTo: 'projects', 
	pathMatch: 'full'
},
{
	path: "projects",
	component: TasksComponent,
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
