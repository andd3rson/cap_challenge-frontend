import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../department-model';
import { DepartmentServices } from '../department.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-department.component.html',
})
export class ListDepartmentComponent implements OnInit {


  departments$!: Observable<Department[]>;
  itemToBeDeleted!: String;

  constructor(private departmentServices: DepartmentServices, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshProjects();
  }


  refreshProjects() {
    this.departments$ = this.departmentServices.getAll();
  }

  open(content: any, item: Department) {
    this.itemToBeDeleted = item.name;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result) {
        this.departmentServices.remove(Number(item!.id)).subscribe(
          success => this.refreshProjects()
        )
      }
    }, (reason) => {
      console.log(reason);

    });
  }


}

