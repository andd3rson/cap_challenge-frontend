import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-to-form-button',
  template: `
  <div class="row d-flex justify-content-end" style="height: 10vh">
    <button type="button" class="btn btn-outline-success m-4" (click)="checked()">
      Create
    </button>
  </div>
  `
})
export class CreateToFormButtonComponent {

  @Input("action-name") actionName: string =  '';
  
  constructor(private router: Router) { }


  checked(){
    console.log(this.actionName);
      this.router.navigate([this.actionName])
  }

}
