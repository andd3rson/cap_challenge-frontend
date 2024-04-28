import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './list-employee/employee.component';

import { HttpClientModule } from '@angular/common/http';
import { FormEmployeeComponent } from './form-employee/form.employee.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EmployeeComponent,
    FormEmployeeComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    
  ], 
  providers:[HttpClientModule]
})
export class EmployeeModule { }
