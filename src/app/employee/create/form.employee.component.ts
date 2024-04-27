import { Employee } from './../employee-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeServices } from '../employee.service';
import { Observable } from 'rxjs';
import { Department } from '../employee-model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './form.employee.component.html',
  styleUrls: ['./form.employee.component.scss']
})
export class FormEmployeeComponent implements OnInit {

  currentAction: String = "";
  form!: FormGroup;
  departments$!: Observable<Department[]>
  employee!: Employee;

  constructor(
    private formBuilder: FormBuilder,
    private employeeServices: EmployeeServices,
    private route: ActivatedRoute,
    private location: Location

  ) {
    this.departments$ = this.employeeServices.getDepartment();
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildForm();
    this.loadIfEdit();


  }

  buildForm() {
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
    console.log(this.form.value);

    if (this.form.valid) {
      if (this.currentAction == 'new') {
        this.onCreate();
      } else {
        this.onUpdate();
      }

    }

  }

  onCreate() {
    this.form.controls["departmentId"]
      .setValue(Number(this.form.controls["departmentId"].value))
    if (this.form.valid) {
      this.employeeServices.create(this.form.value).subscribe(
        success => {
          console.log(success);
        },
        error => console.log(error)

      )
    }

  }
  onUpdate() {
    this.employee = Object.assign(this.employee, this.form.value)
    this.employeeServices
      .update(this.employee, Number(this.employee!.id))
      .subscribe(
        success => {
          console.log(success);
        },
        error => console.log(error)
      )
  }


  // TODO: FIX DEPARTMENT ISN'T LOAD
  loadIfEdit() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(p => this.employeeServices.getById(Number(p.get("id"))))
      ).subscribe(
        (emp: Employee) => {
          this.employee = emp
          this.employee.birthDate = emp.birthDate.toString().substring(0, 10);
          this.form.patchValue(this.employee)

        }
      )
    }
  }

  previewsPage() {
    this.location.back()
  }

  private setCurrentAction() {
    console.log(this.route.snapshot.url[0].path);
    if (this.route.snapshot.url[0].path == "new") {

      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }
}

