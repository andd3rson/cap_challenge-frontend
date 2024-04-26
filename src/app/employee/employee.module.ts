import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './list/employee.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
