import { Injectable, Injector } from '@angular/core';
import { GlobalService } from '../shared/services/globalservices';
import { HttpClient } from '@angular/common/http';
import { Department } from './department-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServices extends GlobalService<Department> {

  constructor(protected injector: Injector) {
    super(injector.get(HttpClient), "departments")
  }

}
