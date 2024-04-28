import { Employee } from '../employee-model';
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
  departments$!: Observable<Department[]>
  employee!: Employee;

  constructor(
    private formBuilder: FormBuilder,
    private employeeServices: EmployeeServices,
    private route: ActivatedRoute,
    private toastr: ToastrService,

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
        birthDate: [null,
          [Validators.required]],
        salary: [null,
          [Validators.required]],
        departmentId: [null,
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
          this.toastr.success(`${this.form.controls['name'].value} has been created`, 'Congrats!!');
          this.form.reset()
        },
        error => this.toastr.error(`we apologize but, could you pls try it again in a few minutes.`, 'uhhh ....')

      )
    }

  }
  onUpdate() {
    this.employee = Object.assign(this.employee, this.form.value)
    this.employeeServices
      .update(this.employee, Number(this.employee!.id))
      .subscribe(
        success => {
          this.toastr.success(`${this.form.controls['name'].value} has been updated`, 'Congrats!!');
          
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

        }
      )
    }
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

