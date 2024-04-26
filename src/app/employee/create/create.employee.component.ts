import { Employee } from './../employee-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeServices } from '../employee.service';
import { Observable } from 'rxjs';
import { Department } from '../employee-model';

@Component({
  selector: 'app-create',
  templateUrl: './create.employee.component.html',
  styleUrls: ['./create.employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {


  form!: FormGroup;
  departments$!: Observable<Department[]>
  employee!: Employee;
  
  constructor(private formBuilder: FormBuilder,
    private employeeServices: EmployeeServices
  ) {

    this.departments$ = this.employeeServices.getDepartment();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ["",
          [Validators.required, Validators.maxLength(20)]],
        lastName: ["",
          [Validators.required, Validators.maxLength(50)]],
        email: ["",
          [Validators.email]],
        birthDate: ["",
          [Validators.required]],
        salary: [null,
          [Validators.required]],
        departmentId: [null,
          [Validators.required]]
      }
    )
  }

  onSave() {
    this.form.controls["departmentId"].setValue(Number(this.form.controls["departmentId"].value))

    if (this.form.valid) {
      this.employeeServices.create(this.form.value).subscribe(
        success => {
          console.log(success);
        },
        error => console.log(error)

      )
    }
  }
}

