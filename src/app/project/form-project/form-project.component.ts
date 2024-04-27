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
export class FormProjectComponent implements OnInit {

  currentAction: String = "";
  form!: FormGroup;
  project!: Project
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
    this.form = this.formBuilder.group(
      {
        name: ["",
          [Validators.required, Validators.maxLength(20)]],
        details: ["",
          [Validators.required, Validators.maxLength(50)]],
        managerName: ["",
          [Validators.required]]
      })

  }

  loadIfEdit() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(p => this.projectServices.getById(Number(p.get("id"))))
      ).subscribe(
        project => {
          this.project = project;
          this.form.patchValue(this.project)
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
    console.log(this.project);

    this.projectServices
      .update(this.project, Number(this.project!.id))
      .subscribe(
        success => {
          console.log(success);
        },
        error => console.log(error)
      )
  }


  previewsPage() {
    this.location.back()
  }
}
