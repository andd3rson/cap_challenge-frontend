import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators"

import { DepartmentServices } from '../department.service';
import { Department } from '../department-model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-form-department',
  templateUrl: './form-department.component.html'
})
export class FormDepartmentComponent implements OnInit {

  currentAction: String = "";
  form!: FormGroup;
  department!: Department
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private departmentServices: DepartmentServices,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildForm();
    this.loadIfEdit();
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
  buildForm() {
    this.form = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.maxLength(50)]],
      })

  }

  loadIfEdit() {


    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(p => this.departmentServices.getById(Number(p.get("id"))))
      ).subscribe(
        department => {
          console.log(department);

          this.department = department;
          this.form.patchValue(this.department)
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

  onCreate() {
    this.departmentServices.create(this.form.value)
      .subscribe(
        success => {
          this.previewsPage();
          console.log(success);
        },
        error => console.log(error)
      )
  }

  onUpdate() {
    this.department = Object.assign(this.department, this.form.value)

    this.departmentServices
      .update(this.department, Number(this.department!.id))
      .subscribe(
        success => {
          this.previewsPage();
          console.log(success);
        },
        error => console.log(error)
      )
  }

  previewsPage() {
    this.location.back()
  }
}
