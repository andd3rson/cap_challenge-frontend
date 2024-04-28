export interface Project {
    id?: Number;
    name: String;
    details: String;
    managerName: String;
    employeesId?: any;
    employees: Employee[];
}

export interface Employee{
    id: Number;
    firstName:String;   
}