import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { GlobalService } from '../shared/services/globalservices';
import { Department, Employee } from './employee-model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServices extends GlobalService<Employee> {

  constructor(protected injector: Injector) {
    super(injector.get(HttpClient), "employees");
  }
  getDepartment(): Observable<Department[]> {
    var t = this.url.replace("employees", "departments");
    console.log(t);

    return this.http.get<Department[]>(this.url.replace("employees", "departments"));
  }
}
