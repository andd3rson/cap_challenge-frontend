import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-previous-button',
  template: `
  
<div class="row d-flex justify-content-start" style="height: 10vh">
  <button
    type="button"
    class="btn btn-outline-dark m-4 border-0"
    (click)="previewsPage()"
  >
  <i class="fa fa-arrow-left" aria-hidden="true"></i>
  </button>
</div>
  `
 
})
export class PreviousButtonComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  previewsPage() {
    this.location.back()
  }
}
