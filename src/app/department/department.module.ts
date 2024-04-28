import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { FormDepartmentComponent } from './form-department/form-department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FormDepartmentComponent, 
    ListDepartmentComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DepartmentRoutingModule
  ]
})
export class DepartmentModule { }
