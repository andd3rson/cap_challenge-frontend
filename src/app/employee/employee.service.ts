import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { GlobalService } from '../shared/services/globalservices';
import { Employee } from './employee-model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServices extends GlobalService<Employee>{

  constructor(protected injector: Injector) { 
   
    super(injector.get(HttpClient), "employees");
  }
}
