import { Component, OnInit } from '@angular/core';
import { EmployeeServices } from '../employee.service';
import { Employee } from '../employee-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  $employee: Observable<Employee[]>;
  
  constructor(private employeeServices: EmployeeServices) {

    this.$employee = this.employeeServices.getAll();
    
  }

  ngOnInit(): void {
  }

}
