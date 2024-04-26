import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private projectServices: ProjectService) { }

  ngOnInit(): void {
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

  onSave() {
    
    if (this.form.valid) {
      this.projectServices.create(this.form.value).subscribe(
        success => {
          console.log(success);
        },
        error => console.log(error)

      )
    }
  }

}
