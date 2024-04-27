import { Component, OnInit } from '@angular/core';
import { EmployeeServices } from '../employee.service';
import { Employee } from '../employee-model';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  $employee!: Observable<Employee[]>;
  itemToBeDeleted!: String;

  constructor(private employeeServices: EmployeeServices, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshEmployee();
  }

  open(content: any, item: Employee) {
    this.itemToBeDeleted = item.firstName;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result) {
        this.employeeServices.remove(Number(item!.id)).subscribe(
          success => this.refreshEmployee()
        )
      }
    }, (reason) => {
      console.log(reason);

    });
  }
  refreshEmployee() {
    this.$employee = this.employeeServices.getAll();
  }
}
