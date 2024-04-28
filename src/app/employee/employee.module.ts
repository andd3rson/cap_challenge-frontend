import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './list/employee.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEmployeeComponent } from './create/form.employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EmployeeComponent,
    FormEmployeeComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeeRoutingModule,
    FormsModule,
    NgbModule
  ], 
  providers:[HttpClientModule]
})
export class EmployeeModule { }
