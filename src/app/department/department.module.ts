import { NgModule } from '@angular/core';

import { DepartmentRoutingModule } from './department-routing.module';
import { FormDepartmentComponent } from './form-department/form-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FormDepartmentComponent, 
    ListDepartmentComponent
  ],
  imports: [
    SharedModule,
    DepartmentRoutingModule
    
  ]
})
export class DepartmentModule { }
