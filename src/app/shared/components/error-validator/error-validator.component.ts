import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-validator',
  template: `
  <p class="text-danger"> {{errorMessage}}</p>
  `

})
export class ErrorValidatorComponent implements OnInit {

  @Input('form-control') formControl: FormControl | undefined;
  message!: String | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  public get errorMessage() {
    if (this.showMessageIfHasAnyError()) {
      return this.getMessage();
    }
    return null;
  }
  showMessageIfHasAnyError() {

    var check = this.formControl!.invalid && this.formControl!.touched;
    return check;
  }
  getMessage() {

    if (this.formControl?.errors?.required) {
      return "it a required field"
    }
    if (this.formControl?.errors?.email) {
      return "must add a valid e-mail"
    }
    if (this.formControl?.errors?.['minlength']) {

      let maxLenght = this.formControl.errors.maxlenght.requiredLenght;
      return `must contain less than ${maxLenght} character`
    }
    return;
  }
}
