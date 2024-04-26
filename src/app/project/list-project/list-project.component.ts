import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project-model';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {

  page = 1;
  pageSize = 7;
  collectionSize = 0;
  projects$!: Project[];
  paginatedProject!: Project[];

  constructor(private projectServices: ProjectService) {

    this.projectServices.getAll().subscribe(p => {
      this.collectionSize = p.length;
      this.paginatedProject = p;
      this.refreshProjects();
    });
  }

  ngOnInit(): void {
  }


  refreshProjects() {
    this.projects$ = this.paginatedProject.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}

