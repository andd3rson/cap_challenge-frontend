import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDepartmentComponent } from './form-department/form-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';

const routes: Routes = [
  {
    path: "",
    component: ListDepartmentComponent
  },
  {
    path: "new",
    component: FormDepartmentComponent
  },
  {
    path: ":id/edit",
    component: FormDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
