import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorValidatorComponent } from './components/error-validator/error-validator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviousButtonComponent } from './components/previous-button/previous-button.component';
import { CreateToFormButtonComponent } from './components/create-to-form-button/create-to-form-button.component';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ErrorValidatorComponent,
    
    PreviousButtonComponent,
    CreateToFormButtonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  exports: [
    NgbModule,

    // shared modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


    // shared components
    ErrorValidatorComponent,
    PreviousButtonComponent,
    CreateToFormButtonComponent
  ]
})
export class SharedModule { }
