import { NgModule } from '@angular/core';

import { ProjectRoutingModule } from './project-routing.module';
import { ListProjectComponent } from './list-project/list-project.component';
import { FormProjectComponent } from './form-project/form-project.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ListProjectComponent,
    FormProjectComponent,
    
  ],
  imports: [
    SharedModule,
    ProjectRoutingModule,
    NgSelectModule,
  ], providers:[]
})
export class ProjectModule { }
