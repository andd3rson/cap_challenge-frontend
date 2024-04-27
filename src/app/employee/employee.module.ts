import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './list/employee.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormEmployeeComponent } from './create/form.employee.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    FormEmployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeeRoutingModule
  ], 
  providers:[HttpClientModule]
})
export class EmployeeModule { }
