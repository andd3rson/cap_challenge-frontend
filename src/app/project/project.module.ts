import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ListProjectComponent } from './list-project/list-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ListProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ], providers:[]
})
export class ProjectModule { }
