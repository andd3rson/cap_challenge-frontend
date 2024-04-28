import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorValidatorComponent } from './components/error-validator/error-validator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviousButtonComponent } from './components/previous-button/previous-button.component';




@NgModule({
  declarations: [
    ErrorValidatorComponent,
    RemoveModalComponent,
    PreviousButtonComponent
  ],
  imports: [
    CommonModule,

  ],
  providers: [],
  exports: [
    NgbModule,

    // shared modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,


    // shared components
    ErrorValidatorComponent,
    RemoveModalComponent,
    PreviousButtonComponent
  ]
})
export class SharedModule { }
