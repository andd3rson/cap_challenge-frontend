import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectComponent } from './list-project/list-project.component';
import { FormProjectComponent } from './form-project/form-project.component';


const routes: Routes = [
  {
    path: "",
    component: ListProjectComponent
  },
  {
    path: "new",
    component: FormProjectComponent
  },
  {
    path: ":id/edit",
    component: FormProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
