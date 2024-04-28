import { Injectable, Injector } from '@angular/core';
import { GlobalService } from '../shared/services/globalservices';
import { Project } from './project-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends GlobalService<Project> {

  constructor(protected injector: Injector) {
    super(injector.get(HttpClient), "projects")
  }
  getEmployyes() {
    var uri = this.url.replace('projects', 'employees')
    return this.http.get(`${uri}?page=1&pageSize=100`);
  }

}
