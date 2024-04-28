import { Project } from './../project-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators"
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',

})
export class FormProjectComponent implements OnInit {

  currentAction: String = "";
  form!: FormGroup;
  project!: Project
  selectedCar: number = 1;
  employess = [];



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private projectServices: ProjectService,
    
    private toastr: ToastrService,
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
    this.loadEmployees()

    this.form = this.formBuilder.group(
      {
        name: ["",
          [Validators.required, Validators.maxLength(20)]],
        details: ["",
          [Validators.required, Validators.maxLength(50)]],
        employeesId: [[],],
        managerName: ["",
          [Validators.required]]
      })

  }

  loadIfEdit() {
    if (this.currentAction == "edit") {

      this.route.paramMap.pipe(
        switchMap(p => this.projectServices.getById(Number(p.get("id"))))
      ).subscribe(
        (project: Project) => {
          this.project = project;
          project.employeesId = project.employees.map(x => x.id);
          this.form.patchValue(this.project)

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
    this.projectServices.create(this.form.value)
      .subscribe(
        success => {
          this.toastr.success(`${this.form.controls['name'].value} has been created`, 'Congrats!!');
          this.form.reset()
        },
        error => this.toastr.error(`we apologize but, could you pls try it again in a few minutes.`, 'uhhh ....')
      )
  }

  onUpdate() {
    this.project = Object.assign(this.project, this.form.value)    
    this.projectServices
      .update(this.project, Number(this.project!.id))
      .subscribe(
        success => {
          this.toastr.success(`${this.form.controls['name'].value} has been updated`, 'Congrats!!');
        },
        error => this.toastr.error(`we apologize but, could you pls try it again in a few minutes.`, 'uhhh ....')
      )
  }

  loadEmployees() {
    this.projectServices.getEmployyes()
      .subscribe((result: any) => {
        this.employess = result.items
      })

  }

}
