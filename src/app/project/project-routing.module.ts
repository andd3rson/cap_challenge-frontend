import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectComponent } from './list-project/list-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';

const routes: Routes = [
  {
    path: "",
    component: ListProjectComponent
  },
  {
    path: "new",
    component: CreateProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
