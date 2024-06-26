import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" routerLink="employee">MVP</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            class="nav-link"
    
            routerLink="employee"
            [routerLinkActive]="['active']"
            >Employee</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            routerLink="project"
            [routerLinkActive]="['active']"
            >Project</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            routerLink="department"
            [routerLinkActive]="['active']"
            >Department</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
  
  `

})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
