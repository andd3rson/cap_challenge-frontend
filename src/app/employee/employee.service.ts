import { Injectable, Injector } from '@angular/core';
import { GlobalService } from '../shared/services/globalservices';
import { Employee } from './employee-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServices extends GlobalService<Employee>{

  constructor(protected injector: Injector) { 
    super(injector.get(HttpClient), "employees");
  }
}
