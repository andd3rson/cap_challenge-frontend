import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './list-employee/employee.component';
import { FormEmployeeComponent } from './form-employee/form.employee.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: 'new',
    component: FormEmployeeComponent
  },
  {
    path: ':id/edit',
    component: FormEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
