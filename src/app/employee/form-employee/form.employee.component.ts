import { Employee, EmployeeRequest } from '../employee-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeServices } from '../employee.service';
import { Observable } from 'rxjs';
import { Department } from '../employee-model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './form.employee.component.html'
})
export class FormEmployeeComponent implements OnInit {

  currentAction: String = "";
  form!: FormGroup;
  departments!: any
  employee!: Employee;
  empUp: any;
  constructor(
    private formBuilder: FormBuilder,
    private employeeServices: EmployeeServices,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildForm();
    this.loadIfEdit();
    this.getDepartment();

  }
  getDepartment() {
    this.employeeServices.getDepartment()
      .subscribe(result => {
        this.departments = result        
      })
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
        birthDate: [null,
          [Validators.required]],
        salary: [null,
          [Validators.required]],
        departmentId: [0,
          [Validators.required]]
      }
    )
  }
  onSave() {

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
          this.toastr.success(`it has been created`, 'Congrats!!');
          this.form.reset()
        },
        error => {this.toastr.error(`we apologize but, could you pls try it again in a few minutes.`, 'uhhh ....')}

      )
    }

  }
  onUpdate() {
    this.employee = Object.assign(this.employee, this.form.value)
    this.employeeServices
      .update(this.employee, Number(this.employee!.id) )
      .subscribe(
        success => {
          this.toastr.success(`It has been updated`, 'Congrats!!');

        },
        error => this.toastr.error(`we apologize but, could you pls try it again in a few minutes.`, 'uhhh ....')
      )
  }

  loadIfEdit() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(p => this.employeeServices.getById(Number(p.get("id"))))
      ).subscribe(
        (emp: Employee) => {
          this.employee = emp
          this.employee.birthDate = emp.birthDate.toString().substring(0, 10);
          this.form.patchValue(this.employee)
          this.form.controls['departmentId'].setValue(emp.department?.id)
        }
      )
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }
}

