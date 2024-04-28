import { Project } from './../project-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators"
import { Location } from '@angular/common';
@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss']
})

// {
//   "name": "busy bees",
//   "details": "install a login",
//   "managerName": "Nós mesmo",
//   "employeesId": [
//     2, 8
//   ]
// }

// {
// 	"id": 3,
//   "name": "busy bees",
//   "details": "install a login",
//   "managerName": "Nós mesmo",
//   "employeesId": [
//     8
//   ]
// }
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
          console.log(success);
        },
        error => console.log(error)
      )
  }

  onUpdate() {
    this.project = Object.assign(this.project, this.form.value)    
    this.projectServices
      .update(this.project, Number(this.project!.id))
      .subscribe(
        success => {
          console.log(success);
        },
        error => console.log(error)
      )
  }

  loadEmployees() {
    this.projectServices.getEmployyes()
      .subscribe((result: any) => {
        this.employess = result.items
      })

  }

  previewsPage() {
    this.location.back()
  }
}
