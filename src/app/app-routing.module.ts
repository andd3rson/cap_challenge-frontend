import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/project",
    pathMatch: "full"
  },
  {
    path: "employee",
    loadChildren: () => import("./employee/employee.module").then(m => m.EmployeeModule)
  },
  {
    path: "project",
    loadChildren: () => import("./project/project.module").then(m => m.ProjectModule)
  },
  {
    path: "department",
    loadChildren: () => import("./department/department.module").then(m => m.DepartmentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
