import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { GlobalService } from '../shared/services/globalservices';
import { Department, Employee } from './employee-model';
import { Observable } from 'rxjs';
import { PagedList } from '../shared/model/PagedList';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServices extends GlobalService<Employee> {

  constructor(protected injector: Injector) {
    super(injector.get(HttpClient), "employees");
  }
  getDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url.replace("employees", "departments"));
  }
  getWithPaginationAndFilter(search: any, page: number, pageSize: number): Observable<PagedList<Employee>> {
    return this.http.get<PagedList<Employee>>(`${this.url}?search=${search}&page=${page}&pageSize=${pageSize}`);
  }

}
